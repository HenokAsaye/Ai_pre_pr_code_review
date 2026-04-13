from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class GitHubTokenIn(BaseModel):
    access_token: str = Field(..., min_length=1, description="GitHub OAuth access token from the client")


class UserOut(BaseModel):
    id: UUID
    email: EmailStr
    github_username: str | None

    model_config = {"from_attributes": True}
