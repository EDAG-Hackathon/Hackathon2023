CREATE DATABASE IF NOT EXISTS dashboard;

\c dashboard;

CREATE TABLE IF NOT EXISTS buildings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
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

