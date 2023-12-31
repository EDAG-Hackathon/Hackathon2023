from http import HTTPStatus
from uuid import UUID

from chalice import Blueprint, Response, BadRequestError
from pydantic_core import ValidationError

from api.constants import cors_config
from db import appointment_db
from models.models import Appointment
from util.util import parse_model

api = Blueprint(__name__)


@api.route("/appointments", methods=['GET'], cors=cors_config)
def get_all_appointments():
    params = api.current_request.query_params
    if params is None:
        appointments = appointment_db.get_all_appointments()
    else:
        appointments = []
        if 'room_id' in params:
            appointments = appointment_db.get_appointments_of_room(UUID(params['room_id']))

    body = [appointment.model_dump(mode='json') for appointment in appointments]

    return Response(
        status_code=HTTPStatus.OK,
        body=body
    )


@api.route("/appointments/{appointment_id}", methods=['GET'], cors=cors_config)
def get_appointment(appointment_id: str):
    try:
        uuid = UUID(appointment_id)
    except ValueError:
        raise BadRequestError(f"{appointment_id} is not a valid id")
    appointment = appointment_db.get_appointment(uuid)

    return Response(
        status_code=HTTPStatus.OK,
        body=appointment.model_dump_json()
    )


@api.route("/appointments", methods=['POST'], cors=cors_config)
def create_appointment():
    request = api.current_request
    try:
        appointment: Appointment = parse_model(Appointment, request.json_body)
    except ValidationError as e:
        raise BadRequestError(str(e))

    appointment_db.create_appointment(appointment)

    return Response(
        status_code=HTTPStatus.OK,
        body=appointment.model_dump_json()
    )
