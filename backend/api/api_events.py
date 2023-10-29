from http import HTTPStatus

from chalice import Blueprint, Response

from api.constants import cors_config
from db import event_db

api = Blueprint(__name__)


@api.route("/events", methods=['GET'], cors=cors_config)
def get_all_events():
    events = event_db.get_all_events()

    body = [event.model_dump(mode='json') for event in events]

    return Response(
        status_code=HTTPStatus.OK,
        body=body
    )
