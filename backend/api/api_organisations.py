from http import HTTPStatus
from uuid import UUID

from chalice import Blueprint, Response

from api.constants import cors_config
from db import organisation_db
from models.models import Organisation
from util.util import parse_model

api = Blueprint(__name__)


@api.route("/organisations", methods=['GET'], cors=cors_config)
def get_all_organisations():
    organisations = organisation_db.get_all_organisations()

    body = [organisation.model_dump(mode='json') for organisation in organisations]

    return Response(
        status_code=HTTPStatus.OK,
        body=body
    )


@api.route("/organisations/{organisation_id}", methods=['GET'], cors=cors_config)
def get_organisation(organisation_id: str):
    organisation = organisation_db.get_organisation(UUID(organisation_id))

    return Response(
        status_code=HTTPStatus.OK,
        body=organisation.model_dump_json()
    )


@api.route("/organisations", methods=['POST'], cors=cors_config)
def create_organisation():
    request = api.current_request
    organisation: Organisation = parse_model(Organisation, request.json_body)

    organisation_db.create_organisation(organisation)

    return Response(
        status_code=HTTPStatus.OK,
        body=organisation.model_dump_json()
    )
