from http import HTTPStatus
from uuid import UUID

from chalice import Blueprint, Response, BadRequestError

from api.constants import cors_config
from db import event_db

api = Blueprint(__name__)


@api.route("/events", methods=['GET'], cors=cors_config)
def get_all_events():
    params = api.current_request.query_params

    if params is None:
        events = event_db.get_all_events()
    else:
        events = []
        if 'room_id' in params:
            try:
                uuid = UUID(params['room_id'])
            except ValueError as e:
                raise BadRequestError(e)

            events = event_db.get_all_events_for_room(uuid)

    body = [event.model_dump(mode='json') for event in events]

    return Response(
        status_code=HTTPStatus.OK,
        body=body
    )
