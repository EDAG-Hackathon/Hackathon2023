from uuid import UUID

from models.models import Appointment
from util.util import parse_model, get_db_connection, close_db_connection, parse_model_list


def get_appointment(appointment_id: UUID) -> Appointment:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM appointments WHERE id=%s;", [str(appointment_id)])
    values = cursor.fetchone()

    close_db_connection(connection, cursor)

    return parse_model(Appointment, values)


def get_all_appointments() -> list[Appointment]:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM appointments;")
    values = cursor.fetchall()

    close_db_connection(connection, cursor)

    return parse_model_list(Appointment, values)


def create_appointment(appointment: Appointment) -> Appointment:
    connection, cursor = get_db_connection()

    cursor.execute(
        "INSERT INTO appointments(id, title, room_id, start_time, end_time) VALUES (%s, %s, %s, %s, %s)",
        (str(appointment.id), appointment.title, str(appointment.room_id), appointment.start_time, appointment.end_time))
    connection.commit()

    close_db_connection(connection, cursor)

    return appointment


def get_appointments_of_organisation(organisation_id: UUID) -> list[Appointment]:
    connection, cursor = get_db_connection()

    cursor.execute("SELECT * FROM appointments WHERE organisation_id=%s;", [str(organisation_id)])
    values = cursor.fetchall()

    close_db_connection(connection, cursor)

    return parse_model_list(Appointment, values)
