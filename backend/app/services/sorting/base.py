from abc import ABC, abstractmethod
from typing import Any, Dict, List


class SortingStrategy(ABC):
    """Abstract base class for sorting strategies"""

    @abstractmethod
    def sort(
        self, data: List[Dict[str, Any]], ascending: bool = True
    ) -> List[Dict[str, Any]]:
        """Sort the data according to the strategy"""
        pass
