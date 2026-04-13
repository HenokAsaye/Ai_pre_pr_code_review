"""Application constants."""

# File patterns to skip when sending diffs to the LLM (not exhaustive).
SKIP_DIFF_PATH_SUBSTRINGS: tuple[str, ...] = (
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "Cargo.lock",
    "poetry.lock",
    "Gemfile.lock",
    ".min.js",
    ".min.css",
)

SKIP_DIFF_EXTENSIONS: tuple[str, ...] = (
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".pdf",
    ".zip",
    ".tar",
    ".gz",
    ".lock",
    ".log",
)
