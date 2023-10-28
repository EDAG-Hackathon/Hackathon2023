from uuid import UUID

from chalice import NotFoundError

from models.models import Room
from util.util import parse_model, get_db_connection, close_db_connection, parse_model_list


def get_room(room_id: UUID) -> Room:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM rooms WHERE id=%s;", [str(room_id)])
    values = cursor.fetchone()

    close_db_connection(connection, cursor)

    if values is None:
        raise NotFoundError(f"Room not found for id {room_id}")

    return parse_model(Room, values)


def get_all_rooms() -> list[Room]:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM rooms;")
    values = cursor.fetchall()

    close_db_connection(connection, cursor)

    return parse_model_list(Room, values)


def create_room(room: Room) -> Room:
    connection, cursor = get_db_connection()

    cursor.execute(
        "INSERT INTO rooms(id, name, number, building_id, room_temp_occupied, room_temp_unoccupied, room_humidity) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (str(room.id), room.name, room.number, str(room.building_id), room.room_temp_occupied,
         room.room_temp_unoccupied, room.room_humidity))
    connection.commit()

    close_db_connection(connection, cursor)

    return room


def get_all_rooms_for_building(building_id: UUID) -> list[Room]:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM rooms WHERE building_id=%s;", [str(building_id)])
    values = cursor.fetchall()

    close_db_connection(connection, cursor)

    return parse_model_list(Room, values)