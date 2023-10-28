from uuid import UUID

from models.models import Room
from util.util import parse_model, get_db_connection, close_db_connection, parse_model_list


def get_room(room_id: UUID) -> Room:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM rooms WHERE id=%s;", [str(room_id)])
    values = cursor.fetchone()

    close_db_connection(connection, cursor)

    return parse_model(Room, values)


def get_all_rooms() -> list[Room]:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM rooms;")
    values = cursor.fetchall()

    close_db_connection(connection, cursor)

    return parse_model_list(Room, values)


def create_room(room: Room) -> Room:
    connection, cursor = get_db_connection()

    cursor.execute("INSERT INTO rooms(id, name, building_id, coordinates, address) VALUES (%s, %s, %s, %s, %s)",
                   (str(room.id), room.name, str(room.building_id), room.coordinates.model_dump_json(), room.address))
    connection.commit()

    close_db_connection(connection, cursor)

    return room
