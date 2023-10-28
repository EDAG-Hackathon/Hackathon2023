from uuid import UUID

from pydantic import BaseModel


class Coordinates(BaseModel):
    lat: float
    lng: float


class Organization(BaseModel):
    id: UUID
    name: str
    coordinates: Coordinates
