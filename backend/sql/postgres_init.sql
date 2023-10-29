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

CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID REFERENCES rooms(id),
    title VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    recurring boolean
);

CREATE TYPE event_type AS ENUM ('temperature', 'forecast', 'sun', 'rain', 'daylight', 'occupancy', 'airquality');

CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type event_type NOT NULL,
    action VARCHAR(255) NOT NULL,
    trigger VARCHAR(255),
    timestamp TIMESTAMP NOT NULL
);
