from fastapi import APIRouter

from app.api.v1.controllers import people, planets

api_router = APIRouter()

api_router.include_router(people.router, tags=["people"])
api_router.include_router(planets.router, tags=["planets"])
