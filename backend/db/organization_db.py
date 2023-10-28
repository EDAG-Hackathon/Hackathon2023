from uuid import UUID

from models.models import Organization
from util.util import parse_model, get_db_connection, close_db_connection, parse_model_list


def get_organization(organization_id: UUID) -> Organization:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM organizations WHERE id=%s;", [str(organization_id)])
    values = cursor.fetchone()

    close_db_connection(connection, cursor)

    return parse_model(Organization, values)


def get_all_organizations() -> list[Organization]:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM organizations;")
    values = cursor.fetchall()

    close_db_connection(connection, cursor)

    return parse_model_list(Organization, values)


def create_organization(organization: Organization) -> Organization:
    connection, cursor = get_db_connection()

    cursor.execute("INSERT INTO organizations(id, name, image, coordinates) VALUES (%s, %s, %s, %s)",
                   (str(organization.id), organization.name, organization.image,
                    organization.coordinates.model_dump_json()))
    connection.commit()

    close_db_connection(connection, cursor)

    return organization
