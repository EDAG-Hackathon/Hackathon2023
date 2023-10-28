from http import HTTPStatus
from uuid import UUID

from chalice import Blueprint, Response

from api.constants import cors_config
from db import room_db
from models.models import Room
from util.util import parse_model

api = Blueprint(__name__)


@api.route("/rooms", methods=['GET'], cors=cors_config)
def get_all_rooms():
    params = api.current_request.query_params
    if params is None:
        rooms = room_db.get_all_rooms()
    else:
        rooms = []
        if 'building_id' in params:
            rooms = room_db.get_all_rooms_for_building(UUID(params['building_id']))

    body = [building.model_dump(mode='json') for building in rooms]

    return Response(
        status_code=HTTPStatus.OK,
        body=body
    )


@api.route("/rooms/{room_id}", methods=['GET'], cors=cors_config)
def get_building(room_id: str):
    building = room_db.get_room(UUID(room_id))

    return Response(
        status_code=HTTPStatus.OK,
        body=building.model_dump_json()
    )


@api.route("/rooms", methods=['POST'], cors=cors_config)
def create_building():
    request = api.current_request
    building: Room = parse_model(Room, request.json_body)

    room_db.create_room(building)

    return Response(
        status_code=HTTPStatus.OK,
        body=building.model_dump_json()
    )
