from functools import lru_cache

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "ai-pre-pr-review-api"
    debug: bool = False
    environment: str = "development"

    database_url: str = Field(
        default="postgresql+psycopg://postgres:postgres@localhost:5432/pre_pr_review",
    )

    redis_url: str = "redis://localhost:6379/0"
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/1"

    jwt_secret: str = Field(default="change-me")
    jwt_algorithm: str = "HS256"

    fernet_key: str = Field(default="", description="32-byte url-safe base64 Fernet key")

    cors_origins: str = "http://localhost:3000"

    openai_api_key: str = ""
    openai_model: str = "gpt-4o"

    github_api_user_agent: str = "ai-pre-pr-review-backend"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @field_validator("fernet_key", mode="before")
    @classmethod
    def strip_fernet(cls, v: str | None) -> str:
        if v is None:
            return ""
        return str(v).strip()


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
