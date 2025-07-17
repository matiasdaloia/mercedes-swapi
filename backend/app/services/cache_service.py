import logging
from typing import Any, Optional

logger = logging.getLogger(__name__)


class CacheService:
    """In-memory caching service for now to keep it simple, we could use Redis in the future"""

    def __init__(self):
        self._memory_cache = {}

    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        return self._memory_cache.get(key)

    async def set(self, key: str, value: Any):
        """Set value in cache"""
        self._memory_cache[key] = value
