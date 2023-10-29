from models.models import Event
from util.util import get_db_connection, close_db_connection, parse_model_list


def get_all_events() -> list[Event]:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM events;")
    values = cursor.fetchall()

    close_db_connection(connection, cursor)

    return parse_model_list(Event, values)


def create_event(event: Event) -> Event:
    connection, cursor = get_db_connection()

    cursor.execute("INSERT INTO events(id, room_id, type, action, trigger, timestamp) VALUES (%s, %s, %s, %s, %s, %s)",
                   (str(event.id), str(event.room_id), event.type.value, event.action, event.trigger, event.timestamp))
    connection.commit()

    close_db_connection(connection, cursor)

    return event
