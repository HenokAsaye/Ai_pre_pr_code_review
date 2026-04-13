from fastapi import APIRouter

from app.api.v1 import auth, repos, reviews

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(repos.router, prefix="/repos", tags=["repos"])
api_router.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
