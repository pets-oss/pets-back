CREATE TABLE organization (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    country VARCHAR(512),
    city VARCHAR(128),
    street VARCHAR(128),
    house VARCHAR(32),
    flat VARCHAR(32),
    phone VARCHAR(64),
    mod_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE EXTENSION moddatetime;

CREATE TRIGGER organization_mod_time
    BEFORE UPDATE ON organization
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime (mod_time);

CREATE TYPE role_type AS ENUM ('Owner', 'Member', 'Reader', 'Guest');

CREATE TABLE app_user (
    id VARCHAR(256) PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    name VARCHAR(256),
    surname VARCHAR(256),
    email VARCHAR(128),
    organization INTEGER REFERENCES organization(id),
    role_type role_type DEFAULT 'Guest',
    mod_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TRIGGER app_user_mod_time
    BEFORE UPDATE ON app_user
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime (mod_time);

CREATE TYPE status AS ENUM ('healthy', 'vaccinated', 'sick', 'adopted');
CREATE TYPE gender AS ENUM ('male', 'female');
CREATE TYPE species AS ENUM ('cat', 'dog', 'hamster', 'parrot', 'snake');

CREATE TABLE animal (
    id SERIAL PRIMARY KEY,
    organization INTEGER REFERENCES organization(id),
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
    mod_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TRIGGER animal_mod_time
    BEFORE UPDATE ON animal
    FOR EACH ROW
    EXECUTE PROCEDURE moddatetime (mod_time);

CREATE TABLE animal_event_check_in (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    date_time TIMESTAMP,
    comments TEXT,
    organization INTEGER REFERENCES organization(id)
);

CREATE TABLE animal_event_check_out (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    date_time TIMESTAMP,
    comments TEXT,
    organization INTEGER REFERENCES organization(id)
);

CREATE type event_general AS ENUM ('birthday', 'adoption', 'getting petted', 'going for a walk');
CREATE TABLE animal_event_general (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    date_time TIMESTAMP,
    comments TEXT,
    organization INTEGER REFERENCES organization(id),
    type event_general,
    expenses NUMERIC
);

CREATE type event_medical AS ENUM ('deworm', 'vaccinate', 'surgery', 'antibiotics');
CREATE TABLE animal_event_medical_record (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id),
    date_time TIMESTAMP,
    comments TEXT,
    organization INTEGER REFERENCES organization(id),
    type event_medical,
    expenses NUMERIC
);
