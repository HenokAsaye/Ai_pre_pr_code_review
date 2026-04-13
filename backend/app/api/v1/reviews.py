from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.core.limiter import limiter
from app.db.session import get_db
from app.deps import get_current_user, parse_uuid
from app.models.review_job import ReviewJob, ReviewStatus
from app.models.user import User
from app.schemas.reviews import AnalyzeRequest, AnalyzeResponse, ReviewIssue, ReviewResultOut
from app.worker.tasks import analyze_review_task

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
@limiter.limit("30/hour")
def enqueue_review(
    request: Request,
    body: AnalyzeRequest,
    db: Session = Depends(get_db),
    current: User = Depends(get_current_user),
) -> AnalyzeResponse:
    job = ReviewJob(
        user_id=current.id,
        owner=body.owner,
        repo=body.repo,
        base_ref=body.base_ref,
        head_ref=body.head_ref,
        status=ReviewStatus.pending,
    )
    db.add(job)
    db.commit()
    db.refresh(job)

    task_id = str(job.id)
    analyze_review_task.apply_async(args=[task_id], task_id=task_id)

    return AnalyzeResponse(task_id=task_id, status=ReviewStatus.pending.value)


@router.get("/{task_id}", response_model=ReviewResultOut)
def get_review_result(
    task_id: str,
    db: Session = Depends(get_db),
    current: User = Depends(get_current_user),
) -> ReviewResultOut:
    job_uuid = parse_uuid(task_id)
    job = (
        db.query(ReviewJob)
        .filter(ReviewJob.id == job_uuid, ReviewJob.user_id == current.id)
        .one_or_none()
    )
    if job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")

    issues: list[ReviewIssue] = []
    raw_issues = job.issues or []
    if isinstance(raw_issues, list):
        for item in raw_issues:
            if isinstance(item, dict):
                try:
                    issues.append(ReviewIssue.model_validate(item))
                except Exception:
                    continue

    return ReviewResultOut(
        score=job.score,
        status=job.status.value if isinstance(job.status, ReviewStatus) else str(job.status),
        summary=job.summary,
        issues=issues,
        error_message=job.error_message,
    )
