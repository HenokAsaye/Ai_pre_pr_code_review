from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import encrypt_secret
from app.db.session import get_db
from app.deps import get_current_user
from app.models.user import User
from app.schemas.auth import GitHubTokenIn, UserOut
from app.services.github_service import GitHubAPIError, fetch_github_user_profile_sync

router = APIRouter()


@router.get("/me", response_model=UserOut)
def read_me(current: User = Depends(get_current_user)) -> User:
    return current


@router.post("/github/token", response_model=UserOut)
def link_github_token(
    body: GitHubTokenIn,
    db: Session = Depends(get_db),
    current: User = Depends(get_current_user),
) -> User:
    try:
        profile = fetch_github_user_profile_sync(body.access_token)
    except GitHubAPIError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Could not validate GitHub token with GitHub API: {e}",
        ) from e

    login = profile.get("login")
    if isinstance(login, str) and login:
        current.github_username = login

    try:
        current.encrypted_github_token = encrypt_secret(body.access_token)
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        ) from e

    db.add(current)
    db.commit()
    db.refresh(current)
    return current
