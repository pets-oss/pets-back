CREATE TABLE organization (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    address VARCHAR(512),
    phone VARCHAR(64),
    modtime timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE role_type AS ENUM ('Owner', 'Member', 'Reader', 'Stranger');

CREATE TABLE app_user (
    id VARCHAR(256) PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    full_name VARCHAR(256),
    email VARCHAR(128),
    organization SMALLINT REFERENCES organization(id),
    role_type role_type DEFAULT 'Stranger',
    modtime timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE status AS ENUM ('healthy', 'vaccinated', 'sick', 'adopted');
CREATE TYPE gender AS ENUM ('male', 'female');
CREATE TYPE species AS ENUM ('cat', 'dog', 'hamster', 'parrot', 'snake');

CREATE TABLE animal (
    id SERIAL PRIMARY KEY,
    organization SMALLINT REFERENCES organization(id),
    registration_no VARCHAR(256) NOT NULL,
    status status,
    image_url VARCHAR(512),
    birth_date DATE,
    name VARCHAR(128),
    species species,
    gender gender,
    microchip_id VARCHAR(256),
    chip_install_date DATE,
    food VARCHAR(256),
    comments TEXT,
    modtime timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE animal_event_check_in (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    date_time TIMESTAMP,
    comments TEXT,
    organization SMALLINT REFERENCES organization(id)
);

CREATE TABLE animal_event_check_out (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    date_time TIMESTAMP,
    comments TEXT,
    organization SMALLINT REFERENCES organization(id)
);

CREATE type event_general AS ENUM ('birthday', 'addoption', 'getting petted', 'going for a walk');
CREATE TABLE animal_event_general (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    date_time TIMESTAMP,
    comments TEXT,
    organization SMALLINT REFERENCES organization(id),
    type event_general,
    expenses NUMERIC
);

CREATE type event_medical AS ENUM ('deworm', 'vaccinate', 'surgery', 'antibiotics');
CREATE TABLE animal_event_medical_record (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    date_time TIMESTAMP,
    comments TEXT,
    organization SMALLINT REFERENCES organization(id),
    type event_medical,
    expenses NUMERIC
);
