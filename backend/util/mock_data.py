import uuid
from datetime import datetime, timedelta, date

from db import organisation_db, building_db, room_db, appointment_db, event_db
from models.models import Organisation, Coordinates, Building, Room, Appointment, EventType, Event
from util.util import parse_model


def generate_mock_data():
    organisations = [
        {
            "name": "Hochschule Fulda",
            "image": "https://www.hs-fulda.de/fileadmin/_processed_/9/6/csm_Blick_auf_Mensa_1ed3503d14.jpg",
            "coordinates": {
                "lat": 50.5646486,
                "lng": 9.6836436
            },
            "address": "Leipziger Strasse 123, Fulda"
        },
        {
            "name": "Richard Müller Schule",
            "image": "https://www.staubach-partner.de/wp-content/uploads/2016/04/rms-1.jpg",
            "coordinates": {
                "lat": 50.55755,
                "lng": 9.6916351
            },
            "address": "Goerdelerstraße 7, 36037 Fulda"
        },
        {
            "name": "Ferdinand Braun Schule Fulda",
            "image": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Ferdinand-Braun-Schule_Fulda_Eingang.jpg",
            "coordinates": {
                "lat": 50.55836,
                "lng": 9.6936651
            },
            "address": "Leipziger Strasse 123, Fulda"
        }
    ]

    buildings = [
        {
            "name": "Hochschul- und Landesbibliothek",
            "number": "BIB",
            "coordinates": {
                "lat": 50.5645872,
                "lng": 9.6829463
            },
            "address": "Leipziger Strasse 123, Fulda"
        },
        {
            "name": "Gebäude 33 (K)",
            "number": "33",
            "coordinates": {
                "lat": 50.5645464,
                "lng": 9.6820259
            },
            "address": "Ludwig-Beck-Straße 54, 36039 Fulda"
        },
        {
            "name": "Gebäude 41 (B)",
            "number": "41",
            "coordinates": {
                "lat": 50.5645464,
                "lng": 9.6820259
            },
            "address": "Marquardstraße 35, 36039 Fulda"
        },
        {
            "name": "Gebäude 54",
            "number": "54",
            "coordinates": {
                "lat": 50.5655019,
                "lng": 9.6657814
            },
            "address": "Moltkestraße 30, 36039 Fulda"
        },
        {
            "name": "Cafe Chaos",
            "number": "CC",
            "coordinates": {
                "lat": 50.5651664,
                "lng": 9.6825301
            },
            "address": "Marquardstraße 35, 36039 Fulda"
        },
        {
            "name": "Studierendenwerk Giessen",
            "number": "SG",
            "coordinates": {
                "lat": 50.566652,
                "lng": 9.6858024
            },
            "address": "Daimler-Benz-Straße 5A, 36039 Fulda"
        }
    ]

    if organisation_db.organisations_exists() is not True:
        for count in range(0, 3):
            organisation = organisations[count]
            new_organisation = Organisation(
                id=uuid.uuid4(),
                address=organisation['address'],
                name=organisation['name'],
                image=organisation['image'],
                coordinates=parse_model(Coordinates, organisation['coordinates'])
            )

            organisation_db.create_organisation(new_organisation)

            if new_organisation.name == "Hochschule Fulda":
                for building in buildings:
                    new_building = Building(
                        id=uuid.uuid4(),
                        organisation_id=new_organisation.id,
                        name=building['name'],
                        address=building['address'],
                        room_temp_occupied=23.0,
                        room_temp_unoccupied=17.0,
                        room_humidity=92.0,
                        coordinates=parse_model(Coordinates, {"lat": 50.55755, "lng": 9.6916351})
                    )

                    building_db.create_building(new_building)

                    _create_rooms(new_building.id)
            else:
                for building_count in range(1, 4):
                    new_building = Building(
                        id=uuid.uuid4(),
                        organisation_id=new_organisation.id,
                        name=f"Building {building_count}",
                        coordinates=Coordinates(lat=50.55836, lng=9.6936651),
                        address=f"Random Building {building_count}, Random City {building_count}",
                        room_temp_occupied=23.0,
                        room_temp_unoccupied=17.0,
                        room_humidity=92.0
                    )

                    building_db.create_building(new_building)

                    _create_rooms(new_building.id)

    _create_event_mocks()


def _create_rooms(building_id: uuid.UUID):
    for room_count in range(1, 21):
        new_room = Room(
            id=uuid.uuid4(),
            name=f"Random Room {room_count}",
            number=f"A-{room_count}",
            building_id=building_id,
            room_temp_occupied=23.0,
            room_temp_unoccupied=17.0,
            room_humidity=92.0
        )

        room_db.create_room(new_room)

        for day_delta in range(-7, 7):
            appointment_date = date.today() + timedelta(days=day_delta)

            match (appointment_date.weekday()):
                case 0:
                    appointment = Appointment(
                        id=uuid.uuid4(),
                        room_id=new_room.id,
                        title="Meeting",
                        recurring=False,
                        start_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                            year=appointment_date.year, hour=9, minute=30),
                        end_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                          year=appointment_date.year, hour=10, minute=30)
                    )
                    appointment_db.create_appointment(appointment)
                case 1:
                    appointment = Appointment(
                        id=uuid.uuid4(),
                        room_id=new_room.id,
                        title="Daily",
                        recurring=False,
                        start_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                            year=appointment_date.year, hour=8, minute=00),
                        end_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                          year=appointment_date.year, hour=8, minute=30)
                    )
                    appointment_db.create_appointment(appointment)
                case 2:
                    appointment = Appointment(
                        id=uuid.uuid4(),
                        room_id=new_room.id,
                        title="Staffing",
                        recurring=False,
                        start_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                            year=appointment_date.year, hour=8, minute=00),
                        end_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                          year=appointment_date.year, hour=8, minute=30)
                    )
                    appointment_db.create_appointment(appointment)
                case 3:
                    appointment = Appointment(
                        id=uuid.uuid4(),
                        room_id=new_room.id,
                        title="Planning",
                        recurring=False,
                        start_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                            year=appointment_date.year, hour=12, minute=30),
                        end_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                          year=appointment_date.year, hour=14, minute=00)
                    )
                    appointment_db.create_appointment(appointment)
                case 4:
                    appointment = Appointment(
                        id=uuid.uuid4(),
                        room_id=new_room.id,
                        title="Review",
                        recurring=False,
                        start_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                            year=appointment_date.year, hour=9, minute=00),
                        end_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                          year=appointment_date.year, hour=12, minute=25)
                    )
                    appointment_db.create_appointment(appointment)
                case 5:
                    appointment = Appointment(
                        id=uuid.uuid4(),
                        room_id=new_room.id,
                        title="Refinement",
                        recurring=False,
                        start_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                            year=appointment_date.year, hour=13, minute=00),
                        end_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                          year=appointment_date.year, hour=15, minute=00)
                    )
                    appointment_db.create_appointment(appointment)
                case 6:
                    appointment = Appointment(
                        id=uuid.uuid4(),
                        room_id=new_room.id,
                        title="TownHall",
                        recurring=False,
                        start_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                            year=appointment_date.year, hour=8, minute=00),
                        end_time=datetime(day=appointment_date.day, month=appointment_date.month,
                                          year=appointment_date.year, hour=15, minute=00)
                    )
                    appointment_db.create_appointment(appointment)


def _create_event_mocks():
    for count in range(1, 5):
        for event_type in EventType:
            match event_type:
                case EventType.TEMPERATURE:
                    _create_event(event_type, "Belüftung eingeschaltet", "CO2 > 1000ppm")
                case EventType.SUN:
                    _create_event(event_type, "Jalousie geschlossen", "Starke Sonneneinstrahlung")
                case EventType.RAIN:
                    _create_event(event_type, "Dachfenster geschlossen", "Angrenzende Gebäude melden Regen")
                case EventType.AIR_QUALITY:
                    _create_event(event_type, "Belüftung eingeschaltet", "CO2 > 1000ppm")
                case EventType.DAYLIGHT:
                    _create_event(event_type, "Beleuchtung eingeschaltet", "Sonnenuntergang")
                case EventType.FORECAST:
                    _create_event(event_type, "Dachfenster geschlossen", "Wettervorhersage meldet Regen")
                case EventType.OCCUPANCY:
                    _create_event(event_type, "Heizen auf 22 Grad Celsius", "Raum belegt")


def _create_event(type: EventType, action: str, trigger: str):
    event = Event(
        id=uuid.uuid4(),
        type=type,
        action=action,
        trigger=trigger,
        timestamp=datetime.now()
    )

    event_db.create_event(event)
