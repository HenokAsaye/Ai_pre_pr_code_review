# AI Pre-PR Code Review

AI-assisted code review platform to analyze GitHub branch diffs **before** you open a pull request.

You select:
- **Base branch** (merge target, e.g. `main`)
- **Head branch** (feature branch)

The system fetches the diff from GitHub, runs a structured review with Gemini, and returns:
- confidence score (`0-100`)
- summary
- issue list with severity and optional suggestions

---

## Table of contents

- [What this app does](#what-this-app-does)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Repository structure](#repository-structure)
- [How the review flow works](#how-the-review-flow-works)
- [Prerequisites](#prerequisites)
- [Environment variables](#environment-variables)
- [Quick start (recommended)](#quick-start-recommended)
- [Local development (without full Docker)](#local-development-without-full-docker)
- [Frontend setup](#frontend-setup)
- [Backend setup](#backend-setup)
- [API overview](#api-overview)
- [Data model](#data-model)
- [Prompt system](#prompt-system)
- [Security notes](#security-notes)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Operational notes](#operational-notes)

---

## What this app does

This project is designed for pre-PR feedback, not CI replacement.

Core capabilities:
- GitHub OAuth login in the frontend
- Repository and branch discovery from GitHub API
- Asynchronous review jobs (queue + worker)
- LLM-based review on filtered unified diffs
- Polling-based result UI for pending/processing/completed/failed states

Non-goals (current implementation):
- Inline PR comments in GitHub
- Multi-LLM orchestration
- Long-term storage of raw diff text

---

## Tech stack

### Frontend
- Next.js 16 (App Router)
- React 19
- NextAuth v5 (GitHub provider)
- TanStack Query
- Axios
- Zustand

### Backend
- FastAPI
- SQLAlchemy + Alembic
- PostgreSQL
- Celery + Redis
- LangChain + Google Gemini
- `python-jose` for JWT validation
- `cryptography` (Fernet) for token encryption at rest

---

## Architecture

```mermaid
flowchart LR
		U[Developer] --> FE[Next.js Frontend]
		FE -->|JWT Bearer| API[FastAPI API]
		API --> DB[(PostgreSQL)]
		API --> Q[(Redis Broker)]
		Q --> W[Celery Worker]
		W --> GH[GitHub API]
		W --> AI[Gemini API]
		W --> DB
		FE -->|poll task status| API
```

### Runtime responsibilities
- **Frontend**: auth, repo/branch selection, trigger analysis, poll task status, render results.
- **API**: validate JWT, manage users/tokens/jobs, enqueue Celery tasks.
- **Worker**: fetch compare diff from GitHub, run AI review, persist structured output.
- **PostgreSQL**: store users and review job metadata/results.
- **Redis**: Celery broker/result backend.

---

## Repository structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/v1/           # auth, repos, reviews routes
│   │   ├── core/             # config, security, celery app, rate limiter
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # request/response models
│   │   ├── services/         # GitHub, AI, prompts
│   │   └── worker/           # Celery tasks
│   ├── alembic/              # migrations
│   ├── config/prompts.yaml   # prompt templates
│   └── docker-compose.yml
├── frontend/
│   ├── src/app/              # routes/pages
│   ├── src/components/       # UI and feature components
│   ├── src/hooks/            # data hooks and polling
│   ├── src/lib/              # auth + API client
│   └── src/stores/           # client state
└── README.md
```

---

## How the review flow works

1. User signs in via GitHub in NextAuth.
2. Frontend signs a backend JWT (`HS256`) using the same shared secret as backend.
3. Frontend sends GitHub access token to backend (`POST /api/v1/auth/github/token`) for encrypted storage.
4. User selects repository + base/head branches.
5. Frontend calls `POST /api/v1/reviews/analyze`.
6. API creates a `review_jobs` row (`pending`) and enqueues Celery task.
7. Worker:
	 - decrypts stored GitHub token
	 - fetches compare payload from GitHub
	 - builds filtered diff text
	 - sends diff + prompt to Gemini
	 - stores score/summary/issues and marks job `completed` (or `failed`)
8. Frontend polls `GET /api/v1/reviews/{task_id}` until terminal status.

---

## Prerequisites

Install locally:
- Python `>=3.11` (3.12 recommended)
- Node.js `>=20`
- PostgreSQL `16` (or compatible)
- Redis `7`
- Git

Accounts/API keys:
- GitHub OAuth App (client ID/secret)
- Google AI Studio key for Gemini

---

## Environment variables

### Backend (`backend/.env`)

Start from:

```bash
cd backend
cp .env.example .env
```

Required/important values:

| Variable | Required | Example | Notes |
|---|---|---|---|
| `APP_NAME` | No | `ai-pre-pr-review-api` | FastAPI title |
| `DEBUG` | No | `false` | Debug mode |
| `ENVIRONMENT` | No | `development` | Environment label |
| `DATABASE_URL` | Yes | `postgresql+psycopg://postgres:postgres@localhost:5432/pre_pr_review` | PostgreSQL DSN |
| `REDIS_URL` | Yes | `redis://localhost:6379/0` | General Redis URL |
| `CELERY_BROKER_URL` | Yes | `redis://localhost:6379/0` | Celery broker |
| `CELERY_RESULT_BACKEND` | Yes | `redis://localhost:6379/1` | Celery result backend |
| `JWT_SECRET` | Yes | `long-random-secret` | **Must match frontend auth secret** |
| `JWT_ALGORITHM` | No | `HS256` | JWT algorithm |
| `FERNET_KEY` | Yes | generated | Encrypts GitHub token at rest |
| `CORS_ORIGINS` | Yes | `http://localhost:3000,http://localhost:3001` | Comma-separated origins |
| `GOOGLE_API_KEY` or `GEMINI_API_KEY` | Yes | `...` | Gemini key |
| `GEMINI_MODEL` | Yes | `gemini-2.5-flash` | Must be available for your key |
| `GITHUB_API_USER_AGENT` | No | `ai-pre-pr-review-backend` | GitHub API header |

Generate `FERNET_KEY`:

```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

### Frontend (`frontend/.env.local`)

Create:

```bash
cd frontend
cat > .env.local <<'EOF'
AUTH_SECRET=replace-with-long-random-secret
# or NEXTAUTH_SECRET=replace-with-long-random-secret

GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret

NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
```

Notes:
- `AUTH_SECRET` and `NEXTAUTH_SECRET` are equivalent in this app; one is enough.
- Frontend secret must match backend `JWT_SECRET` for token verification.
- If frontend runs on a different port (`3001`), update both `NEXTAUTH_URL` and backend `CORS_ORIGINS`.

---

## Quick start (recommended)

### 1) Start backend infrastructure and services

```bash
cd backend
cp .env.example .env
# edit .env values
docker compose up --build
```

This starts:
- `db` (PostgreSQL)
- `redis`
- `api` (FastAPI on `8000`, auto-runs Alembic migrations)
- `worker` (Celery)

### 2) Start frontend

```bash
cd frontend
npm install
npm run dev
```

Open:
- Frontend: `http://localhost:3000`
- API docs: `http://localhost:8000/docs`
- Health: `http://localhost:8000/health`

---

## Local development (without full Docker)

Use this when you want host-run API and worker, but containerized DB/Redis.

### 1) Infrastructure only

```bash
cd backend
docker compose up -d db redis
```

### 2) Backend API + worker on host

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
alembic upgrade head
uvicorn app.main:app --reload
```

In another terminal:

```bash
cd backend
source .venv/bin/activate
celery -A app.core.celery_app:celery_app worker --loglevel=info
```

### 3) Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Frontend setup

Key app routes:
- `/` landing page
- `/login` sign-in page
- `/dashboard` repository list
- `/repo/:owner/:name` branch selection and analysis trigger
- `/analysis/:taskId` polling + results dashboard

Key frontend behavior:
- Route protection via middleware for `/dashboard`, `/repo`, `/analysis`
- On authenticated session, frontend posts GitHub access token to backend once per browser session
- Axios client attaches backend JWT as `Authorization: Bearer ...`
- Polling interval defaults to 3 seconds until status is terminal

---

## Backend setup

### Core endpoints

Base prefix: `/api/v1`

Auth:
- `GET /auth/me` - current user from JWT
- `POST /auth/github/token` - validate and store GitHub token (encrypted)

Repositories:
- `GET /repos` - list authenticated GitHub repositories
- `GET /repos/{owner}/{repo}/branches` - list branches

Reviews:
- `POST /reviews/analyze` - enqueue analysis job
- `GET /reviews/{task_id}` - fetch job status/result

Misc:
- `GET /health` - health check

### Example: enqueue review

```bash
curl -X POST http://localhost:8000/api/v1/reviews/analyze \
	-H "Authorization: Bearer <backend-jwt>" \
	-H "Content-Type: application/json" \
	-d '{
		"owner": "your-org",
		"repo": "your-repo",
		"base_ref": "main",
		"head_ref": "feature/my-change"
	}'
```

### Example: poll result

```bash
curl -H "Authorization: Bearer <backend-jwt>" \
	http://localhost:8000/api/v1/reviews/<task_id>
```

Statuses:
- `pending`
- `processing`
- `completed`
- `failed`

---

## API overview

### `POST /api/v1/auth/github/token`

Request body:

```json
{
	"access_token": "gho_..."
}
```

Behavior:
- Calls GitHub `GET /user` to validate token.
- Stores token encrypted with Fernet.
- Persists `github_username` when available.

### `POST /api/v1/reviews/analyze`

Request body:

```json
{
	"owner": "octocat",
	"repo": "hello-world",
	"base_ref": "main",
	"head_ref": "feature/refactor"
}
```

Response:

```json
{
	"task_id": "uuid",
	"status": "pending"
}
```

### `GET /api/v1/reviews/{task_id}`

Response example:

```json
{
	"score": 82,
	"status": "completed",
	"summary": "Solid change with some edge-case issues.",
	"issues": [
		{
			"file": "src/service.ts",
			"line": 48,
			"severity": "high",
			"message": "Potential null dereference.",
			"suggestion": "Guard before accessing nested fields."
		}
	],
	"error_message": null
}
```

---

## Data model

### `users`
- `id` (UUID)
- `email` (unique)
- `github_username` (nullable)
- `encrypted_session_jwt` (nullable)
- `encrypted_github_token` (nullable)
- timestamps

### `review_jobs`
- `id` (UUID)
- `user_id` FK
- repo identity (`owner`, `repo`)
- branch refs (`base_ref`, `head_ref`)
- status (`pending`, `processing`, `completed`, `failed`)
- `score`, `summary`, `issues` (JSONB), `error_message`
- timestamps

Important:
- Raw diff text is processed in memory for review and **not persisted** as a DB field.

---

## Prompt system

Prompt templates live in:
- `backend/config/prompts.yaml`

Current prompt loader:
- loads YAML once via `lru_cache`
- reads `senior_developer_review` block
- renders `user_template` with `{owner}`, `{repo}`, `{base_ref}`, `{head_ref}`, `{diff_text}`

To customize review behavior, edit prompt text in `prompts.yaml` and restart API/worker.

---

## Security notes

- Backend JWT verification uses shared secret with frontend auth secret.
- GitHub tokens are encrypted at rest using Fernet (`FERNET_KEY`).
- CORS restricted to explicit origins via `CORS_ORIGINS`.
- Protected backend routes require `Authorization: Bearer <backend-jwt>`.
- Missing/invalid JWT yields `401`; malformed task IDs yield `400`.

Recommended hardening for non-local environments:
- rotate secrets regularly (`AUTH_SECRET` / `JWT_SECRET` / `FERNET_KEY`)
- run over HTTPS only
- tighten OAuth scopes as needed
- add audit logging/monitoring for auth and job failures

---

## Testing

Backend tests:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
pytest -q
```

Existing tests cover:
- health endpoint
- GitHub diff transformation behavior

---

## Troubleshooting

### 1) `401 Invalid or expired token`

Check:
- frontend `AUTH_SECRET`/`NEXTAUTH_SECRET` equals backend `JWT_SECRET`
- frontend sends `session.backendJwt` in auth header

### 2) `FERNET_KEY is not set`

Set backend `FERNET_KEY` in `.env` and restart API/worker.

### 3) GitHub token linking fails (`502`)

Check:
- OAuth scopes include `read:user user:email repo`
- token is valid and not revoked

### 4) Gemini errors (`404` model not found / `429` quota)

Check:
- `GOOGLE_API_KEY` is valid
- model in `GEMINI_MODEL` is available for your key
- billing/quota settings in Google AI Studio

### 5) Task stays `pending`

Check:
- Celery worker is running
- Redis reachable via `CELERY_BROKER_URL`
- worker logs for processing errors

### 6) Frontend callback URL mismatch

If frontend runs on a non-default port, update:
- `NEXTAUTH_URL`
- GitHub OAuth callback URL (`/api/auth/callback/github`)

### 7) CORS errors in browser

Add frontend origin to backend `CORS_ORIGINS` (comma-separated list) and restart API.

---

## Operational notes

- Review enqueue endpoint is rate-limited (`30/hour` per client).
- Worker task hard time limit is 30 minutes.
- Diff processing skips common binary/lock/minified files before sending to LLM.
- Diff payload is truncated at `120,000` chars to control token/cost behavior.
- Issue list from model is capped (`max 25` parsed issues).

---

## License

No license file is currently defined in this repository. Add one before public distribution.
