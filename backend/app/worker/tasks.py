from __future__ import annotations

from datetime import datetime, timezone
from uuid import UUID

from app.core.celery_app import celery_app
from app.core.security import decrypt_secret
from app.db.session import SessionLocal
from app.models.review_job import ReviewJob, ReviewStatus
from app.models.user import User
from app.services.ai_service import run_senior_review_sync
from app.services.github_service import GitHubAPIError, fetch_compare_diff_text_sync


@celery_app.task(name="app.worker.tasks.hello")
def hello_task() -> str:
    return "Hello from Celery"


@celery_app.task(name="app.worker.tasks.analyze_review")
def analyze_review_task(job_id: str) -> str:
    db = SessionLocal()
    try:
        job = db.query(ReviewJob).filter(ReviewJob.id == UUID(job_id)).one_or_none()
        if job is None:
            return "missing_job"

        job.status = ReviewStatus.processing
        db.commit()

        user = db.query(User).filter(User.id == job.user_id).one_or_none()
        if user is None or not user.encrypted_github_token:
            job.status = ReviewStatus.failed
            job.error_message = "GitHub token is not linked for this user."
            job.completed_at = datetime.now(timezone.utc)
            db.commit()
            return "no_github_token"

        try:
            token = decrypt_secret(user.encrypted_github_token)
        except ValueError as e:
            job.status = ReviewStatus.failed
            job.error_message = str(e)
            job.completed_at = datetime.now(timezone.utc)
            db.commit()
            return "decrypt_failed"

        try:
            diff_text = fetch_compare_diff_text_sync(
                job.owner,
                job.repo,
                job.base_ref,
                job.head_ref,
                token,
            )
        except GitHubAPIError as e:
            job.status = ReviewStatus.failed
            code = e.status_code or "?"
            job.error_message = f"GitHub compare failed ({code}): {e}"
            job.completed_at = datetime.now(timezone.utc)
            db.commit()
            return "github_error"

        try:
            score, summary, issues = run_senior_review_sync(
                owner=job.owner,
                repo=job.repo,
                base_ref=job.base_ref,
                head_ref=job.head_ref,
                diff_text=diff_text,
            )
        except Exception as e:  # noqa: BLE001
            job.status = ReviewStatus.failed
            job.error_message = str(e)
            job.completed_at = datetime.now(timezone.utc)
            db.commit()
            return "llm_error"

        job.status = ReviewStatus.completed
        job.score = score
        job.summary = summary
        job.issues = [i.model_dump() for i in issues]
        job.completed_at = datetime.now(timezone.utc)
        db.commit()
        return "ok"
    finally:
        db.close()
