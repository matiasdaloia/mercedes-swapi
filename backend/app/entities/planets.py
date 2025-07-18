from datetime import datetime
from typing import List

from pydantic import BaseModel


class Planet(BaseModel):
    name: str
    rotation_period: str
    orbital_period: str
    diameter: str
    climate: str
    gravity: str
    terrain: str
    surface_water: str
    population: str
    residents: List[str]
    films: List[str]
    created: datetime
    edited: datetime
    url: str
