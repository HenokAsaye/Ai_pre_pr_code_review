"""Add encrypted_session_jwt to users.

Revision ID: 20260413_0002
Revises: 20260413_0001
Create Date: 2026-04-13
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "20260413_0002"
down_revision: str | None = "20260413_0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("encrypted_session_jwt", sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "encrypted_session_jwt")
