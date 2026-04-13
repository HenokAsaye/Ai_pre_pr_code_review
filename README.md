# AI Pre-PR Code Review

Helps developers run an automated review **before** opening a pull request: choose the **base** branch (merge target) and **head** branch (your work), then receive structured feedback from an LLM.

## Repository layout

- **`backend/`** — FastAPI API, Celery workers, PostgreSQL models, GitHub + OpenAI integration (`backend/README.md`).

## Backend at a glance

- **FastAPI** (`/api/v1`): auth (GitHub token storage), repos/branches, enqueue + poll review jobs.
- **Celery + Redis** for long-running compare + LLM analysis.
- **PostgreSQL** for users and review job metadata; **diff text is not persisted** (only AI output and job fields).
- **JWT**: validated with the same secret as NextAuth (`JWT_SECRET` / `NEXTAUTH_SECRET`).
- **Prompts**: versioned YAML in `backend/config/prompts.yaml`.

Start the stack: see `backend/README.md` and `backend/docker-compose.yml`.
