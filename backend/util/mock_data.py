import uuid

from db import organisation_db, building_db, room_db
from models.models import Organisation, Coordinates, Building, Room
from util.util import parse_model


def generate_mock_data():
    organisations = [
        {
            "name": "Hochschule Fulda",
            "image": "https://www.hs-fulda.de/fileadmin/_processed_/9/6/csm_Blick_auf_Mensa_1ed3503d14.jpg",
            "coordinates": {
                "lat": 50.55755,
                "lng": 9.6916351
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
            "name": "Gebäude A1",
            "number": "A1",
            "coordinates": {
                "lat": 50.55755,
                "lng": 9.6916351
            },
            "address": "Leipziger Strasse 123, Fulda"
        },
        {
            "name": "Gebäude A2",
            "number": "A2",
            "coordinates": {
                "lat": 50.55755,
                "lng": 9.6916351
            },
            "address": "Leipziger Strasse 123, Fulda"
        },
        {
            "name": "Gebäude A3",
            "number": "A3",
            "coordinates": {
                "lat": 50.55836,
                "lng": 9.6936651
            },
            "address": "Leipziger Strasse 123, Fulda"
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
