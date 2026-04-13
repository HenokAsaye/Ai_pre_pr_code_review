from __future__ import annotations

from urllib.parse import quote

import httpx

from app.core.config import settings
from app.core.constants import SKIP_DIFF_EXTENSIONS, SKIP_DIFF_PATH_SUBSTRINGS


class GitHubAPIError(Exception):
    def __init__(self, message: str, status_code: int | None = None):
        super().__init__(message)
        self.status_code = status_code


def fetch_github_user_profile_sync(token: str) -> dict:
    """Returns the authenticated user object from `GET /user` (sync)."""
    with httpx.Client(timeout=30.0) as client:
        r = client.get("https://api.github.com/user", headers=_headers(token))
        if r.status_code != 200:
            raise GitHubAPIError(r.text, r.status_code)
        data = r.json()
        return data if isinstance(data, dict) else {}


def _headers(token: str) -> dict[str, str]:
    headers: dict[str, str] = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": settings.github_api_user_agent,
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


async def list_user_repositories(token: str) -> list[dict]:
    url = "https://api.github.com/user/repos"
    results: list[dict] = []
    params: dict[str, str | int] = {"per_page": 100, "sort": "updated", "page": 1}
    async with httpx.AsyncClient(timeout=60.0) as client:
        while True:
            r = await client.get(url, headers=_headers(token), params=params)
            if r.status_code != 200:
                raise GitHubAPIError(r.text, r.status_code)
            batch = r.json()
            if not isinstance(batch, list):
                break
            results.extend(batch)
            link = r.headers.get("Link", "")
            if 'rel="next"' not in link:
                break
            params["page"] = int(params["page"]) + 1  # type: ignore[arg-type]
    return results


async def list_branches(owner: str, repo: str, token: str) -> list[dict]:
    url = f"https://api.github.com/repos/{owner}/{repo}/branches"
    async with httpx.AsyncClient(timeout=60.0) as client:
        r = await client.get(url, headers=_headers(token), params={"per_page": 100})
        if r.status_code != 200:
            raise GitHubAPIError(r.text, r.status_code)
        data = r.json()
        return data if isinstance(data, list) else []


def _should_skip_path(path: str) -> bool:
    lower = path.lower()
    for s in SKIP_DIFF_PATH_SUBSTRINGS:
        if s in lower:
            return True
    for ext in SKIP_DIFF_EXTENSIONS:
        if lower.endswith(ext):
            return True
    return False


def compare_payload_to_diff_text(payload: dict) -> str:
    """Turn a GitHub compare API JSON payload into filtered unified diff text (not persisted)."""
    files = payload.get("files") or []
    if not isinstance(files, list):
        return ""

    chunks: list[str] = []
    for f in files:
        if not isinstance(f, dict):
            continue
        path = str(f.get("filename") or "")
        if not path or _should_skip_path(path):
            continue
        patch = f.get("patch")
        if not patch:
            status = f.get("status")
            chunks.append(f"# {path} (no patch; status={status})\n")
            continue
        chunks.append(f"### {path}\n{patch}\n")

    text = "\n".join(chunks).strip()
    max_chars = 120_000
    if len(text) > max_chars:
        text = text[:max_chars] + "\n\n[DIFF TRUNCATED]\n"
    return text


def _compare_url(owner: str, repo: str, base_ref: str, head_ref: str) -> str:
    compare_path = f"{base_ref}...{head_ref}"
    encoded = quote(compare_path, safe=".")
    return f"https://api.github.com/repos/{owner}/{repo}/compare/{encoded}"


def fetch_compare_diff_text_sync(owner: str, repo: str, base_ref: str, head_ref: str, token: str) -> str:
    """Sync variant for Celery workers."""
    url = _compare_url(owner, repo, base_ref, head_ref)
    with httpx.Client(timeout=120.0) as client:
        r = client.get(url, headers=_headers(token))
        if r.status_code != 200:
            raise GitHubAPIError(r.text, r.status_code)
        payload = r.json()
    if not isinstance(payload, dict):
        return ""
    return compare_payload_to_diff_text(payload)


async def fetch_compare_diff_text(owner: str, repo: str, base_ref: str, head_ref: str, token: str) -> str:
    """Async variant for FastAPI routes."""
    url = _compare_url(owner, repo, base_ref, head_ref)
    async with httpx.AsyncClient(timeout=120.0) as client:
        r = await client.get(url, headers=_headers(token))
        if r.status_code != 200:
            raise GitHubAPIError(r.text, r.status_code)
        payload = r.json()
    if not isinstance(payload, dict):
        return ""
    return compare_payload_to_diff_text(payload)
