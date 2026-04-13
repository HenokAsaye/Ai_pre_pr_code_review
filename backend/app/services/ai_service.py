from __future__ import annotations

import json
from typing import Any

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field, ValidationError

from app.core.config import settings
from app.schemas.reviews import ReviewIssue
from app.services.prompt_loader import get_senior_review_messages


class _LLMReviewPayload(BaseModel):
    score: int = Field(ge=0, le=100)
    summary: str
    issues: list[dict[str, Any]] = Field(default_factory=list)


def _adjust_score_for_severity(base_score: int, issues: list[ReviewIssue]) -> int:
    penalty = 0
    for issue in issues:
        if issue.severity == "critical":
            penalty += 12
        elif issue.severity == "high":
            penalty += 6
        elif issue.severity == "medium":
            penalty += 2
    return max(0, min(100, base_score - penalty))


def _parse_issues(raw: list[dict[str, Any]]) -> list[ReviewIssue]:
    parsed: list[ReviewIssue] = []
    for item in raw[:25]:
        if not isinstance(item, dict):
            continue
        normalized = dict(item)
        sev = normalized.get("severity")
        if isinstance(sev, str):
            normalized["severity"] = sev.lower()
        try:
            parsed.append(ReviewIssue.model_validate(normalized))
        except ValidationError:
            continue
    return parsed


def run_senior_review_sync(
    *,
    owner: str,
    repo: str,
    base_ref: str,
    head_ref: str,
    diff_text: str,
) -> tuple[int, str, list[ReviewIssue]]:
    """Runs the configured chat model (OpenAI via LangChain) and returns structured review data."""
    if not settings.openai_api_key:
        raise ValueError("OPENAI_API_KEY is not set")

    if not diff_text.strip():
        return (
            100,
            "No code changes detected after filtering (or empty compare).",
            [],
        )

    system, user = get_senior_review_messages(
        owner=owner,
        repo=repo,
        base_ref=base_ref,
        head_ref=head_ref,
        diff_text=diff_text,
    )

    llm = ChatOpenAI(
        model=settings.openai_model,
        temperature=0.2,
        api_key=settings.openai_api_key,
        model_kwargs={"response_format": {"type": "json_object"}},
    )
    msg = llm.invoke([SystemMessage(content=system), HumanMessage(content=user)])
    content = msg.content
    if not isinstance(content, str):
        raise ValueError("Unexpected LLM response shape")

    data = json.loads(content)
    payload = _LLMReviewPayload.model_validate(data)
    issues = _parse_issues(payload.issues)
    score = _adjust_score_for_severity(payload.score, issues)
    return score, payload.summary, issues
