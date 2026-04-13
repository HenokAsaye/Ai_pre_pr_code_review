# AI Pre-PR Review — Backend

FastAPI service with Celery workers, PostgreSQL, and Redis. See the repository root for product context.

## Quick start (local)

1. Copy environment file:

   `cp .env.example .env`

   Set `FERNET_KEY` (generate with the command in `.env.example`), `JWT_SECRET` (match NextAuth), and `OPENAI_API_KEY`.

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

## API docs

With the server running: http://localhost:8000/docs
