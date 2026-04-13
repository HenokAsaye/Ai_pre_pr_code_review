from functools import lru_cache
from pathlib import Path
from typing import Any

import yaml

_CONFIG_DIR = Path(__file__).resolve().parents[2] / "config"


@lru_cache
def load_prompts() -> dict[str, Any]:
    path = _CONFIG_DIR / "prompts.yaml"
    if not path.is_file():
        raise FileNotFoundError(f"Missing prompts file: {path}")
    with path.open(encoding="utf-8") as f:
        data = yaml.safe_load(f)
    if not isinstance(data, dict):
        raise ValueError("prompts.yaml must contain a mapping at the root")
    return data


def get_senior_review_messages(
    *,
    owner: str,
    repo: str,
    base_ref: str,
    head_ref: str,
    diff_text: str,
) -> tuple[str, str]:
    prompts = load_prompts()
    block = prompts.get("senior_developer_review") or {}
    system = str(block.get("system") or "").strip()
    template = str(block.get("user_template") or "").strip()
    user = template.format(
        owner=owner,
        repo=repo,
        base_ref=base_ref,
        head_ref=head_ref,
        diff_text=diff_text,
    )
    return system, user
