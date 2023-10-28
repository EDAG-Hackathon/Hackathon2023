import psycopg2.extras
from chalice import Chalice, CORSConfig
from api.api_organisations import api as api_organisations
from api.api_buildings import api as api_buildings

app = Chalice("dashboard-backend")


cors_config = CORSConfig(
    allow_origin='*',
)


@app.route("/")
def hello_world():
    return {"hello": "world"}


psycopg2.extras.register_uuid()
app.register_blueprint(api_organisations, url_prefix="/api")
app.register_blueprint(api_buildings, url_prefix="/api")
