from http import HTTPStatus

from chalice import Response


class NoContentResponse(Response):
    def __init__(self):
        super().__init__(status_code=HTTPStatus.NO_CONTENT, body={})
