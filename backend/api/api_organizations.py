from http import HTTPStatus
from uuid import UUID

from chalice import Blueprint, Response

from db import organization_db
from models.models import Organization
from util.util import parse_model

api = Blueprint(__name__)


@api.route("/organizations", methods=['GET'])
def get_all_organizations():
    organizations = organization_db.get_all_organizations()

    body = [organization.model_dump(mode='json') for organization in organizations]

    return Response(
        status_code=HTTPStatus.OK,
        body=body
    )


@api.route("/organizations/{organization_id}", methods=['GET'])
def get_organization(organization_id: str):
    organization = organization_db.get_organization(UUID(organization_id))

    return Response(
        status_code=HTTPStatus.OK,
        body=organization.model_dump_json()
    )


@api.route("/organizations", methods=['POST'])
def create_organization():
    request = api.current_request
    organization: Organization = parse_model(Organization, request.json_body)

    organization_db.create_organization(organization)

    return Response(
        status_code=HTTPStatus.OK,
        body=organization.model_dump_json()
    )
