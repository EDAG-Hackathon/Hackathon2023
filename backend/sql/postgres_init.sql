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
    coordinates json NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    number VARCHAR(255),
    building_id UUID REFERENCES buildings(id)
);

CREATE TABLE IF NOT EXISTS sensors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
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
INSERT INTO buildings (id, name, organisation_id, coordinates, address) VALUES
('f701fec4-fe5b-40ae-891d-301e1a1974bd', 'A-1', '0265b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916351}', 'Leipziger Strasse 123, Fulda'),
('f801fec4-fe5b-40ae-891d-301e1a1974bd', 'A-2', '0265b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916361}', 'Leipziger Strasse 124, Fulda'),
('f901fec4-fe5b-40ae-891d-301e1a1974bd', 'A-3', '0265b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916371}', 'Leipziger Strasse 125, Fulda'),
('f101fec4-fe5b-40ae-891d-301e1a1974bd', 'A-1', '0275b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916451}', 'Pappelweg 8, Fulda'),
('f201fec4-fe5b-40ae-891d-301e1a1974bd', 'A-2', '0275b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6917451}', 'Pappelweg 9, Fulda'),
('f301fec4-fe5b-40ae-891d-301e1a1974bd', 'A-3', '0275b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916452}', 'Pappelweg 10, Fulda'),
('f401fec4-fe5b-40ae-891d-301e1a1974bd', 'A-1', '0266b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916351}', 'Goerdelerstraße 7, 36037 Fulda'),
('f501fec4-fe5b-40ae-891d-301e1a1974bd', 'A-2', '0266b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916451}', 'Goerdelerstraße 8, 36037 Fulda'),
('f601fec4-fe5b-40ae-891d-301e1a1974bd', 'A-3', '0266b386-db38-4cfe-8b57-a343a2c37765', '{"lat": 50.55755, "lng": 9.6916551}', 'Goerdelerstraße 9, 36037 Fulda');
