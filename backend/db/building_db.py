from uuid import UUID

from models.models import Building
from util.util import parse_model, get_db_connection, close_db_connection, parse_model_list


def get_building(building_id: UUID) -> Building:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM buildings WHERE id=%s;", [str(building_id)])
    values = cursor.fetchone()

    close_db_connection(connection, cursor)

    return parse_model(Building, values)


def get_all_buildings() -> list[Building]:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM buildings;")
    values = cursor.fetchall()

    close_db_connection(connection, cursor)

    return parse_model_list(Building, values)


def create_building(building: Building) -> Building:
    connection, cursor = get_db_connection()

    cursor.execute(
        "INSERT INTO buildings(id, name, organisation_id, coordinates, address, room_temp_occupied, room_temp_unoccupied, room_humidity) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        (str(building.id), building.name, str(building.organisation_id), building.coordinates.model_dump_json(),
         building.address, building.room_temp_occupied, building.room_temp_unoccupied, building.room_humidity))
    connection.commit()

    close_db_connection(connection, cursor)

    return building


def get_buildings_of_organisation(organisation_id: UUID) -> list[Building]:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM buildings WHERE organisation_id=%s;", [str(organisation_id)])
    values = cursor.fetchall()

    close_db_connection(connection, cursor)

    return parse_model_list(Building, values)
