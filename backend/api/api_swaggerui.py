import base64
import os

from chalice import Response, Blueprint

api = Blueprint(__name__)


@api.route('/docs/{path}', methods=["GET"])
def openapi(path):
    if path.startswith('/') or '..' in path:
        return Response(status_code=404, body='Not Found')

    file = open(f'swaggerui/{path}', 'rb')

    if path.endswith('.yaml'):
        content_type = 'application/yaml'
    elif path.endswith('.json'):
        content_type = 'application/json'
    elif path.endswith('.html'):
        content_type = 'text/html'
    elif path.endswith('.js'):
        content_type = 'text/javascript'
    elif path.endswith('.css'):
        content_type = 'text/css'
    elif path.endswith('.png'):
        content_type = 'image/png'
    else:
        content_type = 'text/plain'

    return Response(
        status_code=200,
        body=file.read(),
        headers={'Content-Type': content_type}
    )


# does not work with AWS API Gateway because headers are remapped to X-Amzn-Remapped-<original>
def _require_basic_auth():
    try:
        token = api.current_request.headers['authorization']
        if not token.startswith('Basic '):
            return _unauthorized_response()
        credentials = base64.b64decode(token[6:]).decode('utf-8').split(':', 1)
        if len(credentials) != 2:
            return _unauthorized_response()
        if credentials[0] != 'swagger' and credentials[1] != 'swagger':
            return _unauthorized_response()
    except Exception as e:
        print(f'Error: {e}')
        print(f'Error type: {type(e)}')
        return _unauthorized_response()

    return None


def _unauthorized_response():
    return Response(
        status_code=401,
        body='Unauthorized',
        headers={'Content-Type': 'text/plain', 'www-authenticate': 'Basic realm="openapi"'}
    )