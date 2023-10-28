from http import HTTPStatus
from uuid import UUID

from chalice import Blueprint, Response

from api.constants import cors_config
from db import building_db
from models.models import Building
from util.util import parse_model

api = Blueprint(__name__)


@api.route("/buildings", methods=['GET'], cors=cors_config)
def get_all_buildings():
    buildings = building_db.get_all_buildings()

    body = [building.model_dump(mode='json') for building in buildings]

    return Response(
        status_code=HTTPStatus.OK,
        body=body
    )


@api.route("/buildings/{building_id}", methods=['GET'], cors=cors_config)
def get_building(building_id: str):
    building = building_db.get_building(UUID(building_id))

    return Response(
        status_code=HTTPStatus.OK,
        body=building.model_dump_json()
    )


@api.route("/buildings", methods=['POST'], cors=cors_config)
def create_building():
    request = api.current_request
    building: Building = parse_model(Building, request.json_body)

    building_db.create_building(building)

    return Response(
        status_code=HTTPStatus.OK,
        body=building.model_dump_json()
    )