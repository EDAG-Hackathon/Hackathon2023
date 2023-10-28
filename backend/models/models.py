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
    room_temp_occupied: float
    room_temp_unoccupied: float
    room_humidity: float


class Room(BaseModel):
    id: UUID
    building_id: UUID
    name: str
    number: str
    room_temp_occupied: Optional[float]
    room_temp_unoccupied: Optional[float]
    room_humidity: Optional[float]
