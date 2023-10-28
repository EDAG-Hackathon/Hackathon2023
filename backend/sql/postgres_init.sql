CREATE DATABASE dashboard;

\c dashboard;

CREATE TABLE IF NOT EXISTS organisations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    coordinates json NOT NULL,
    address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS buildings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organisation_id UUID REFERENCES organisations(id),
    name VARCHAR(255),
    number VARCHAR(255),
    address VARCHAR(255),
    coordinates json NOT NULL,
    room_temp_occupied NUMERIC(3,1) NOT NULL,
    room_temp_unoccupied NUMERIC(3,1) NOT NULL,
    room_humidity NUMERIC(3,1) NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    number VARCHAR(255),
    building_id UUID REFERENCES buildings(id),
    room_temp_occupied NUMERIC(3,1),
    room_temp_unoccupied NUMERIC(3,1),
    room_humidity NUMERIC(3,1)
);

CREATE TYPE hardware_protocols AS ENUM ('http', 'https', 'mqtt', 'snmp', 'matter');

CREATE TABLE IF NOT EXISTS hardware (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    manufacturer VARCHAR(255),
    protocol hardware_protocols NOT NULL
);

CREATE TYPE sensor_types AS ENUM ('temperature', 'humidity', 'air_quality', 'air_pressure');

CREATE TABLE IF NOT EXISTS sensors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    hardware_id UUID REFERENCES hardware(id),
    name VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    type sensor_types,
    room_id UUID REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS schedule (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID REFERENCES rooms(id),
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

-- Mockdata organisations --
INSERT INTO organisations (id, name, image, coordinates, address) VALUES
('0265b386-db38-4cfe-8b57-a343a2c37765', 'Hochschule Fulda', 'https://example.com/image1.jpg', '{"lat": 50.55755, "lng": 9.6916351}', 'Leipziger Strasse 123, Fulda'),
('0275b386-db38-4cfe-8b57-a343a2c37765', 'Richard Müller Schule', 'https://www.staubach-partner.de/wp-content/uploads/2016/04/rms-1.jpg', '{"lat": 50.55755, "lng": 9.6916351}', 'Goerdelerstraße 7, 36037 Fulda'),
('0266b386-db38-4cfe-8b57-a343a2c37765', 'Ferdinand Braun Schule', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Ferdinand-Braun-Schule_Fulda_Eingang.jpg', '{"lat": 50.55836, "lng": 9.6936651}', 'Goerdeler Straße 7, Fulda');

-- Mockdata buildings --
INSERT INTO buildings (id, name, organisation_id, coordinates, address, room_temp_occupied, room_temp_unoccupied, room_humidity) VALUES
('f701fec4-fe5b-40ae-891d-301e1a1974bd', 'A-1', '0265b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916351}', 'Leipziger Strasse 123, Fulda', 23.0, 15.0, 70.0),
('f801fec4-fe5b-40ae-891d-301e1a1974bd', 'A-2', '0265b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916361}', 'Leipziger Strasse 124, Fulda', 23.0, 15.0, 70.0),
('f901fec4-fe5b-40ae-891d-301e1a1974bd', 'A-3', '0265b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916371}', 'Leipziger Strasse 125, Fulda', 23.0, 15.0, 70.0),
('f101fec4-fe5b-40ae-891d-301e1a1974bd', 'A-1', '0275b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916451}', 'Pappelweg 8, Fulda', 23.0, 15.0, 70.0),
('f201fec4-fe5b-40ae-891d-301e1a1974bd', 'A-2', '0275b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6917451}', 'Pappelweg 9, Fulda', 23.0, 15.0, 70.0),
('f301fec4-fe5b-40ae-891d-301e1a1974bd', 'A-3', '0275b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916452}', 'Pappelweg 10, Fulda', 23.0, 15.0, 70.0),
('f401fec4-fe5b-40ae-891d-301e1a1974bd', 'A-1', '0266b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916351}', 'Goerdelerstraße 7, 36037 Fulda', 23.0, 15.0, 70.0),
('f501fec4-fe5b-40ae-891d-301e1a1974bd', 'A-2', '0266b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916451}', 'Goerdelerstraße 8, 36037 Fulda', 23.0, 15.0, 70.0),
('f601fec4-fe5b-40ae-891d-301e1a1974bd', 'A-3', '0266b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916551}', 'Goerdelerstraße 9, 36037 Fulda', 23.0, 15.0, 70.0);

-- Mockdata rooms --
INSERT INTO rooms (id, name, number, building_id, room_temp_occupied, room_temp_unoccupied, room_humidity) VALUES
('85927fde-23ac-4d18-bc20-a282269b95f5', 'Room 1', 'A-1', 'f701fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85927fde-23ac-5d18-bc20-a282269b95f5', 'Room 2', 'A-1', 'f701fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85927fde-23ac-6d18-bc20-a282269b95f5', 'Room 3', 'A-1', 'f701fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85927fde-23ac-7d18-bc20-a282269b95f5', 'Room 4', 'A-1', 'f701fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85927fde-23ac-8d18-bc20-a282269b95f5', 'Room 5', 'A-1', 'f701fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85927fde-23ac-9d18-bc20-a282269b95f5', 'Room 6', 'A-1', 'f701fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85927fde-21ac-9d18-bc20-a282269b95f5', 'Room 7', 'A-1', 'f701fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85927fde-22ac-9d18-bc20-a282269b95f5', 'Room 8', 'A-1', 'f701fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85927fde-24ac-9d18-bc20-a282269b95f5', 'Room 9', 'A-1', 'f701fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85927fde-25ac-9d18-bc20-a282269b95f5', 'Room 10', 'A-1', 'f701fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('86927fde-23ac-4d18-bc20-a282269b95f5', 'Room 1', 'A-1', 'f801fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('87927fde-23ac-5d18-bc20-a282269b95f5', 'Room 2', 'A-1', 'f801fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('88927fde-23ac-6d18-bc20-a282269b95f5', 'Room 3', 'A-1', 'f801fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('89927fde-23ac-7d18-bc20-a282269b95f5', 'Room 4', 'A-1', 'f801fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('81927fde-23ac-8d18-bc20-a282269b95f5', 'Room 5', 'A-1', 'f801fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('82927fde-23ac-9d18-bc20-a282269b95f5', 'Room 6', 'A-1', 'f801fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('83927fde-21ac-9d18-bc20-a282269b95f5', 'Room 7', 'A-1', 'f801fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('84927fde-22ac-9d18-bc20-a282269b95f5', 'Room 8', 'A-1', 'f801fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85928fde-24ac-9d18-bc20-a282269b95f5', 'Room 9', 'A-1', 'f801fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85027fde-25ac-9d18-bc20-a282269b95f5', 'Room 10', 'A-1', 'f801fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('86917fde-23ac-4d18-bc20-a282269b95f5', 'Room 1', 'A-1', 'f901fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('87927fde-23ac-5d18-bc20-a282269b05f5', 'Room 2', 'A-1', 'f901fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('88937fde-23ac-6d18-bc20-a282269b95f5', 'Room 3', 'A-1', 'f901fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('89947fde-23ac-7d18-bc20-a282269b95f5', 'Room 4', 'A-1', 'f901fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('81957fde-23ac-8d18-bc20-a282269b95f5', 'Room 5', 'A-1', 'f901fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('82967fde-23ac-9d18-bc20-a282269b95f5', 'Room 6', 'A-1', 'f901fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('83977fde-21ac-9d18-bc20-a282269b95f5', 'Room 7', 'A-1', 'f901fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('84987fde-22ac-9d18-bc20-a282269b95f5', 'Room 8', 'A-1', 'f901fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85997fde-24ac-9d18-bc20-a282269b95f5', 'Room 9', 'A-1', 'f901fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0),
('85028fde-25ac-9d18-bc20-a282269b95f5', 'Room 10', 'A-1', 'f901fec4-fe5b-40ae-891d-301e1a1974bd', 23.0, 15.0, 70.0);
