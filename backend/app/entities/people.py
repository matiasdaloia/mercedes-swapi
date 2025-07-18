from datetime import datetime
from typing import List

from pydantic import BaseModel


class Person(BaseModel):
    name: str
    height: str
    mass: str
    hair_color: str
    skin_color: str
    eye_color: str
    birth_year: str
    gender: str
    homeworld: str
    films: List[str]
    species: List[str]
    vehicles: List[str]
    starships: List[str]
    created: datetime
    edited: datetime
    url: str
