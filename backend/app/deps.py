from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import decrypt_secret, encrypt_secret, verify_jwt_token
from app.db.session import get_db
from app.models.user import User

security = HTTPBearer(auto_error=True)


def get_token_payload(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        return verify_jwt_token(credentials.credentials)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        ) from e


def get_current_user(
    db: Session = Depends(get_db),
    payload: dict = Depends(get_token_payload),
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> User:
    email = payload.get("email")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Access token must include an 'email' claim (configure NextAuth session).",
        )
    user = db.query(User).filter(User.email == email).first()
    encrypted_jwt: str | None = None
    try:
        encrypted_jwt = encrypt_secret(credentials.credentials)
    except RuntimeError:
        # Keep auth functional even if token-at-rest encryption is not configured yet.
        encrypted_jwt = None

    if user is None:
        sub = payload.get("sub")
        user = User(
            email=email,
            github_username=str(sub) if sub else None,
            encrypted_session_jwt=encrypted_jwt,
        )
        db.add(user)
        try:
            db.commit()
            db.refresh(user)
        except IntegrityError:
            # Concurrent first-login requests can race and hit unique(email); recover by loading existing row.
            db.rollback()
            existing = db.query(User).filter(User.email == email).first()
            if existing is None:
                raise
            user = existing
    elif encrypted_jwt and not user.encrypted_session_jwt:
        user.encrypted_session_jwt = encrypted_jwt
        db.add(user)
        try:
            db.commit()
            db.refresh(user)
        except IntegrityError:
            db.rollback()
            refreshed = db.query(User).filter(User.email == email).first()
            if refreshed is None:
                raise
            user = refreshed
    return user


def get_github_access_token(user: User = Depends(get_current_user)) -> str:
    if not user.encrypted_github_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Link a GitHub token first via POST /api/v1/auth/github/token.",
        )
    try:
        return decrypt_secret(user.encrypted_github_token)
    except ValueError as e:
        raise HTTPException(status_code=500, detail="Stored GitHub token could not be decrypted.") from e


def parse_uuid(task_id: str) -> UUID:
    try:
        return UUID(task_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid task id") from e
