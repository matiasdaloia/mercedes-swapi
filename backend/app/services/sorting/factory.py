from typing import Dict, List, Optional

from .base import SortingStrategy
from .strategies import CreatedSortingStrategy, NameSortingStrategy


class SortingFactory:
    """Factory for creating sorting strategies"""

    _strategies: Dict[str, SortingStrategy] = {
        "name": NameSortingStrategy(),
        "created": CreatedSortingStrategy(),
    }

    @classmethod
    def get_strategy(cls, field: str) -> Optional[SortingStrategy]:
        """Get a sorting strategy by field name"""
        return cls._strategies.get(field.lower())

    @classmethod
    def register_strategy(cls, field: str, strategy: SortingStrategy):
        """Register a new sorting strategy"""
        cls._strategies[field.lower()] = strategy

    @classmethod
    def get_available_fields(cls) -> List[str]:
        """Get list of available sorting fields"""
        return list(cls._strategies.keys())
