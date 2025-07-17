import logging

import httpx

from app.config import settings
from app.core.exceptions import SwapiConnectionError
from app.services.cache_service import CacheService

logger = logging.getLogger(__name__)

PLANETS_CACHE_KEY = "planets:all"
PEOPLE_CACHE_KEY = "people:all"


class SwapiService:
    """Service for interacting with the Star Wars API"""

    def __init__(self):
        self.base_url = settings.SWAPI_BASE_URL
        self.cache = CacheService()
        self.client = httpx.AsyncClient(timeout=30.0)

    async def get_all_people(self) -> list:
        """Fetch all people from SWAPI with caching"""

        cached = await self.cache.get(PEOPLE_CACHE_KEY)
        if cached:
            return cached

        url = f"{self.base_url}/people"

        try:
            response = await self.client.get(url)
            response.raise_for_status()
            data = response.json()

            await self.cache.set(PEOPLE_CACHE_KEY, data)

            return data
        except httpx.HTTPError as e:
            logger.error(f"Error fetching people: {e}")
            raise SwapiConnectionError(f"Failed to fetch people: {str(e)}")

    async def get_all_planets(self) -> list:
        """Fetch all planets from SWAPI with caching"""

        cached = await self.cache.get(PLANETS_CACHE_KEY)
        if cached:
            return cached

        url = f"{self.base_url}/planets"

        try:
            response = await self.client.get(url)
            response.raise_for_status()
            data = response.json()

            await self.cache.set(PLANETS_CACHE_KEY, data)

            return data
        except httpx.HTTPError as e:
            logger.error(f"Error fetching planets: {e}")
            raise SwapiConnectionError(f"Failed to fetch planets: {str(e)}")
