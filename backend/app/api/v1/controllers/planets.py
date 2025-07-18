import logging
import math
from typing import Literal, Optional

from fastapi import APIRouter, HTTPException, Query

from app.services.sorting.factory import SortingFactory
from app.services.swapi import SwapiService

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/planets")
async def get_planets(
    page: int = Query(1, ge=1, description="Page number"),
    search: Optional[str] = Query(
        None, description="Search term for filtering by name"
    ),
    sort_by: Optional[Literal["name", "created"]] = Query(
        None, description="Field to sort by"
    ),
    order: Literal["asc", "desc"] = Query("asc", description="Sort order"),
):
    """
    Get paginated list of Star Wars planets with search and sort capabilities.

    - **page**: Page number (default: 1)
    - **search**: Case-insensitive partial match on name
    - **sort_by**: Sort by 'name' or 'created'
    - **order**: 'asc' or 'desc'
    """
    swapi = SwapiService()
    PAGE_SIZE = 15

    try:
        data = await swapi.get_all_planets()
        results = data

        if search:
            results = [
                planet for planet in results if search.lower() in planet["name"].lower()
            ]

        if sort_by:
            strategy = SortingFactory.get_strategy(sort_by)
            if strategy:
                results = strategy.sort(results, ascending=(order == "asc"))

        total_count = len(results)
        total_pages = math.ceil(total_count / PAGE_SIZE)

        start_idx = (page - 1) * PAGE_SIZE
        end_idx = start_idx + PAGE_SIZE

        paginated_results = results[start_idx:end_idx]

        return {
            "count": total_count,
            "page": page,
            "total_pages": total_pages,
            "next": page < total_pages,
            "previous": page > 1,
            "results": paginated_results,
        }

    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
