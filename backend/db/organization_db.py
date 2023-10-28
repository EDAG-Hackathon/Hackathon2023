import json
import os
from uuid import UUID

from models.models import Organization, Coordinates
from util import util
from util.util import parse_model


def get_organization(organization_id: UUID) -> Organization:
    connection = util.db_connect()

    connection.execute("SELECT * FROM organizations WHERE id=%s", str(organization_id))
    values = connection.fetchone()
    print(values)
    return _get_organization_from_values(values)


def create_organization(organization: Organization) -> Organization:
    connection = util.db_connect()
    connection.execute("INSERT INTO organizations(id, name, coordinates) VALUES (%s, %s, %s)",
                       (str(organization.id), organization.name, organization.coordinates.model_dump_json()))

    return organization


def _get_organization_from_values(values: dict):
    coordinates = parse_model(Coordinates, values['coordinates'])

    return Organization(
        id=values['id'],
        name=values['name'],
        coordinates=coordinates
    )
