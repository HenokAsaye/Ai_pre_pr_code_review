from pydantic import BaseModel, Field


class ReviewIssue(BaseModel):
    file: str
    line: int | None = None
    severity: str = Field(..., pattern="^(low|medium|high|critical)$")
    message: str
    suggestion: str | None = None


class AnalyzeRequest(BaseModel):
    owner: str = Field(..., min_length=1, max_length=255)
    repo: str = Field(..., min_length=1, max_length=255)
    base_ref: str = Field(..., min_length=1, max_length=512, description="Base branch name (merge target)")
    head_ref: str = Field(..., min_length=1, max_length=512, description="Head branch with your changes")


class AnalyzeResponse(BaseModel):
    task_id: str
    status: str


class ReviewResultOut(BaseModel):
    score: int | None = None
    status: str
    summary: str | None = None
    issues: list[ReviewIssue] = []
    error_message: str | None = None
