from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class Coordinates(BaseModel):
    lat: float
    lng: float


class Organisation(BaseModel):
    id: UUID
    name: str
    image: Optional[str] = None
    coordinates: Coordinates
    address: str


class Building(BaseModel):
    id: UUID
    organisation_id: UUID
    name: str
    coordinates: Coordinates
    address: str
