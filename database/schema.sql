CREATE TABLE organization (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    address VARCHAR(512),
    phone VARCHAR(64)
);

CREATE TYPE role_type AS ENUM ('Owner', 'Member', 'Reader', 'Stranger');

CREATE TABLE users (
    id VARCHAR(256) PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    full_name VARCHAR(256),
    email VARCHAR(128),
    organization SMALLINT REFERENCES organization(id),
    role_type role_type DEFAULT 'Stranger'
);

CREATE TYPE status AS ENUM ('healthy', 'vaccinated', 'sick', 'adopted');
CREATE TYPE gender AS ENUM ('male', 'female');
CREATE TYPE species AS ENUM ('cat', 'dog', 'hamster', 'parrot', 'snake');

CREATE TABLE animal (
    id SERIAL PRIMARY KEY,
    organization SMALLINT REFERENCES organization(id),
    registration_no VARCHAR(256) NOT NULL,
    status status,
    imageUrl VARCHAR(512),
    birthDate DATE,
    name VARCHAR(128),
    species species,
    gender gender,
    microchip_id VARCHAR(256),
    chip_install_date DATE,
    food VARCHAR(256),
    comments TEXT
);

CREATE TABLE animal_event_check_in (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    dateTime TIMESTAMP,
    comments TEXT,
    organization SMALLINT REFERENCES organization(id)
);

CREATE TABLE animal_event_check_out (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    dateTime TIMESTAMP,
    comments TEXT,
    organization SMALLINT REFERENCES organization(id)
);

CREATE TABLE animal_event_general (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    dateTime TIMESTAMP,
    comments TEXT,
    organization SMALLINT REFERENCES organization(id),
    type VARCHAR(64),
    expenses NUMERIC
);

CREATE TABLE animal_event_medical_record (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    dateTime TIMESTAMP,
    comments TEXT,
    organization SMALLINT REFERENCES organization(id),
    type VARCHAR(64),
    expenses NUMERIC
);
