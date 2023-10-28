from http import HTTPStatus

from chalice import Response, CORSConfig

cors_config = CORSConfig(
    allow_origin='*',
)


class NoContentResponse(Response):
    def __init__(self):
        super().__init__(status_code=HTTPStatus.NO_CONTENT, body={})
