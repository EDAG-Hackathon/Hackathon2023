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

-- Mockdaten organisations --
INSERT INTO organisations (name, image, coordinates, address) VALUES
('Hochschule Fulda', 'https://example.com/image1.jpg', '{"lat": 50.55755, "lng": 9.6916351}', 'Pappelweg 8, Fulda'),
('Richard Müller Schule', 'https://www.staubach-partner.de/wp-content/uploads/2016/04/rms-1.jpg', '{"lat": 50.55755, "lng": 9.6916351}', 'Pappelweg 8, Fulda'),
('Ferdinand Braun Schule', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Ferdinand-Braun-Schule_Fulda_Eingang.jpg', '{"lat": 50.55836, "lng": 9.6936651}', 'Goerdeler Straße 7, Fulda');
