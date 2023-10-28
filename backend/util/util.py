import os
from typing import TypeVar

import psycopg2
from psycopg2._psycopg import cursor
from pydantic import BaseModel

T = TypeVar('T', bound=BaseModel)


def parse_model(model: type[T], values: dict) -> T:
    return model.model_validate(values)


def db_connect() -> cursor:
    conn = psycopg2.connect(host=os.environ["DB_HOST"], port=os.environ["DB_PORT"], dbname=os.environ["DB_NAME"],
                            user=os.environ["DB_USER"], password=os.environ["DB_PASS"])
    return conn.cursor()
