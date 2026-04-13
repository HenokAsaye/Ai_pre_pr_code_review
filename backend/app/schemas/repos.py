from pydantic import BaseModel


class RepoOut(BaseModel):
    id: int
    name: str
    full_name: str
    private: bool
    default_branch: str | None
    html_url: str
    description: str | None = None


class BranchOut(BaseModel):
    name: str
    sha: str
