import psycopg2.extras
from chalice import Chalice
from api.api_organizations import api as api_organizations

app = Chalice("dashboard-backend")


@app.route("/")
def hello_world():
    return {"hello": "world"}


psycopg2.extras.register_uuid()
app.register_blueprint(api_organizations)
