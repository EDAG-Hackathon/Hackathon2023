from uuid import UUID

from models.models import Organisation
from util.util import parse_model, get_db_connection, close_db_connection, parse_model_list


def get_organisation(organisation_id: UUID) -> Organisation:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM organisations WHERE id=%s;", [str(organisation_id)])
    values = cursor.fetchone()

    close_db_connection(connection, cursor)

    return parse_model(Organisation, values)


def get_all_organisations() -> list[Organisation]:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM organisations;")
    values = cursor.fetchall()

    close_db_connection(connection, cursor)

    return parse_model_list(Organisation, values)


def create_organisation(organisation: Organisation) -> Organisation:
    connection, cursor = get_db_connection()

    cursor.execute("INSERT INTO organisations(id, name, image, coordinates, address) VALUES (%s, %s, %s, %s, %s)",
                   (str(organisation.id), organisation.name, organisation.image,
                    organisation.coordinates.model_dump_json(), organisation.address))
    connection.commit()

    close_db_connection(connection, cursor)

    return organisation


def organisations_exists() -> bool:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT count(*) FROM organisations;")
    result = cursor.fetchone()

    return result['count'] > 0
