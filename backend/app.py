import psycopg2.extras
from chalice import Chalice

from api.api_buildings import api as api_buildings
from api.api_organisations import api as api_organisations
from api.api_rooms import api as api_rooms
from api.api_appointments import api as api_appointments
from api.api_swaggerui import api as api_swaggerui
from util.mock_data import generate_mock_data

app = Chalice("dashboard-backend")


@app.route("/")
def hello_world():
    return {"hello": "world"}


psycopg2.extras.register_uuid()
app.register_blueprint(api_organisations, url_prefix="/api")
app.register_blueprint(api_buildings, url_prefix="/api")
app.register_blueprint(api_rooms, url_prefix="/api")
app.register_blueprint(api_appointments, url_prefix="/api")
app.register_blueprint(api_swaggerui, url_prefix="/api")

generate_mock_data()