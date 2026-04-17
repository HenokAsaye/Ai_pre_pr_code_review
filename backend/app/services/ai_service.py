from __future__ import annotations

import json
from typing import Any

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel, Field, ValidationError

from app.core.config import settings
from app.schemas.reviews import ReviewIssue
from app.services.prompt_loader import get_senior_review_messages


class _LLMReviewPayload(BaseModel):
    score: int = Field(ge=0, le=100)
    summary: str
    issues: list[dict[str, Any]] = Field(default_factory=list)


def _text_from_message(msg: BaseMessage) -> str:
    """Normalize LangChain message content to a string (Gemini may return structured parts)."""
    raw = msg.content
    if isinstance(raw, str):
        return raw.strip()
    if isinstance(raw, list):
        parts: list[str] = []
        for block in raw:
            if isinstance(block, str):
                parts.append(block)
            elif isinstance(block, dict):
                if block.get("type") == "text" and isinstance(block.get("text"), str):
                    parts.append(block["text"])
        return "".join(parts).strip()
    return str(raw).strip()


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
    """Runs Google Gemini via LangChain and returns structured review data."""
    if not settings.google_api_key.strip():
        raise ValueError("GOOGLE_API_KEY or GEMINI_API_KEY is not set")

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

    llm = ChatGoogleGenerativeAI(
        model=settings.gemini_model,
        api_key=settings.google_api_key,
        temperature=0.2,
        response_mime_type="application/json",
        convert_system_message_to_human=True,
    )
    msg = llm.invoke([SystemMessage(content=system), HumanMessage(content=user)])
    if not isinstance(msg, AIMessage):
        raise ValueError("Unexpected LLM response type")

    text = _text_from_message(msg)
    if not text:
        raise ValueError("Empty LLM response")

    data = json.loads(text)
    payload = _LLMReviewPayload.model_validate(data)
    issues = _parse_issues(payload.issues)
    score = _adjust_score_for_severity(payload.score, issues)
    return score, payload.summary, issues
