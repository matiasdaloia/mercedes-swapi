from datetime import datetime
from typing import Any, Dict, List

from .base import SortingStrategy


class NameSortingStrategy(SortingStrategy):
    """Strategy for sorting by name field"""

    def sort(
        self, data: List[Dict[str, Any]], ascending: bool = True
    ) -> List[Dict[str, Any]]:
        return sorted(
            data, key=lambda x: x.get("name", "").lower(), reverse=not ascending
        )


class CreatedSortingStrategy(SortingStrategy):
    """Strategy for sorting by created date field"""

    def sort(
        self, data: List[Dict[str, Any]], ascending: bool = True
    ) -> List[Dict[str, Any]]:
        def parse_date(item):
            created = item.get("created", "")
            if isinstance(created, str):
                try:
                    return datetime.fromisoformat(created.replace("Z", "+00:00"))
                except ValueError:
                    return datetime.min
            return created

        return sorted(data, key=parse_date, reverse=not ascending)
