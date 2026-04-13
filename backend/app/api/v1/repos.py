from fastapi import APIRouter, Depends, HTTPException, status

from app.deps import get_github_access_token
from app.schemas.repos import BranchOut, RepoOut
from app.services.github_service import GitHubAPIError, list_branches, list_user_repositories

router = APIRouter()


@router.get("", response_model=list[RepoOut])
async def list_repos(
    token: str = Depends(get_github_access_token),
) -> list[RepoOut]:
    try:
        raw = await list_user_repositories(token)
    except GitHubAPIError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"GitHub API error: {e}",
        ) from e

    out: list[RepoOut] = []
    for r in raw:
        if not isinstance(r, dict):
            continue
        try:
            out.append(
                RepoOut(
                    id=int(r["id"]),
                    name=str(r["name"]),
                    full_name=str(r["full_name"]),
                    private=bool(r.get("private")),
                    default_branch=r.get("default_branch"),
                    html_url=str(r["html_url"]),
                    description=r.get("description"),
                )
            )
        except (KeyError, TypeError, ValueError):
            continue
    return out


@router.get("/{owner}/{repo}/branches", response_model=list[BranchOut])
async def list_repo_branches(
    owner: str,
    repo: str,
    token: str = Depends(get_github_access_token),
) -> list[BranchOut]:
    try:
        raw = await list_branches(owner, repo, token)
    except GitHubAPIError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"GitHub API error: {e}",
        ) from e

    out: list[BranchOut] = []
    for b in raw:
        if not isinstance(b, dict):
            continue
        name = b.get("name")
        commit = b.get("commit") if isinstance(b.get("commit"), dict) else {}
        sha = commit.get("sha") if isinstance(commit, dict) else None
        if isinstance(name, str) and isinstance(sha, str):
            out.append(BranchOut(name=name, sha=sha))
    return out
