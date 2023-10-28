from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class Coordinates(BaseModel):
    lat: float
    lng: float


class Organization(BaseModel):
    id: UUID
    name: str
    image: Optional[str] = None
    coordinates: Coordinates
    address: str
