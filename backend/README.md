# AI Pre-PR Review — Backend

FastAPI service with Celery workers, PostgreSQL, and Redis. See the repository root for product context.

## Quick start (local)

1. Copy environment file:

   `cp .env.example .env`

   Set `FERNET_KEY` (generate with the command in `.env.example`), `JWT_SECRET` (match NextAuth), and `GOOGLE_API_KEY` for Gemini.

2. Start infrastructure:

   `docker compose up -d db redis`

3. Create a virtualenv and install:

   `pip install -e ".[dev]"`

4. Run migrations:

   `alembic upgrade head`

5. Run API and worker in separate terminals:

   `uvicorn app.main:app --reload`

   `celery -A app.core.celery_app:celery_app worker --loglevel=info`

## Docker (API + worker + DB + Redis)

`docker compose up --build`

The API runs migrations on startup, then serves on port 8000.

### Notes on container warnings

- Redis may warn about `vm.overcommit_memory`; the compose file requests this sysctl for the Redis
  container. If your Docker setup still shows the warning, set it on the host:
  `sudo sysctl -w vm.overcommit_memory=1`
- Celery worker runs as non-root in compose (`uid:gid 65534:65534`) to avoid the superuser warning.

## API docs

With the server running: http://localhost:8000/docs

### Gemini model name (`GEMINI_MODEL`)

Use an id from [Gemini models](https://ai.google.dev/gemini-api/docs/models). Older names like `gemini-1.5-flash` may return **404** on current `v1beta` endpoints.

To list models your API key can call:

```bash
curl -sS "https://generativelanguage.googleapis.com/v1beta/models?key=$GOOGLE_API_KEY" | head -c 4000
```

If you see **429** with `free_tier` / `limit: 0`, try **`gemini-2.5-flash-lite`** or enable billing in AI Studio.
