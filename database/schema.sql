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
    id VARCHAR(256) PRIMARY KEY NOT NULL,
    username VARCHAR(128) NOT NULL,
    name VARCHAR(256),
    surname VARCHAR(256),
    email VARCHAR(128),
    organization INTEGER REFERENCES organization(id) NOT NULL,
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
CREATE TYPE color AS ENUM ('blue', 'red', 'brown', 'grey', 'black', 'white', 'green', 'violet', 'pink', 'sand', 'orange');
CREATE TYPE breed AS ENUM (
    'siberian husky', 'alaskan malamute', 'samoyed', 'greenland dog', 'poodle', 'beagle', 'bulldog', 'chihuahua', 'dachshund', 'french bulldog', 'maltese dog', 'german shepherd', 'great dane', 'greyhound', 'doberman', 'rottweiler', 'pomeranian dog', 'bernese mountain dog', 'shin tzu', 'chow chow', 'basset hound', 'havanese dog', 'irish setter', 'bull terrier', 'staffordshire bull terrier', 'saint bernard', 'afghan hound', 'irish wolfhound', 'pointer', 'american staffordshire terrier', 'bichon frise', 'border collie', 'cavalier king charles spaniel', 'newfoundland dog', 'chinese crested dog', 'pembroke welsh corgi', 'golden retriever', 'labrador retriever', 'lithuanian hound',
    'ragdoll', 'persian cat', 'maine coon', 'siamese cat', 'sphynx cat', 'british shorthair', 'bengal cat', 'american shorthair', 'birman', 'scottish fold', 'abyssinian cat'
);

CREATE TABLE animal (
    id SERIAL PRIMARY KEY,
    organization INTEGER REFERENCES organization(id) NOT NULL,
    registration_no VARCHAR(256) NOT NULL,
    registration_date DATE DEFAULT CURRENT_DATE NOT NULL,
    status status,
    image_url VARCHAR(512),
    birth_date DATE,
    name VARCHAR(128),
    species species,
    breed breed,
    gender gender,
    color color,
    weight NUMERIC,
    microchip_id VARCHAR(256),
    chip_install_date DATE,
    allergy VARCHAR(128),
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
    animal INTEGER REFERENCES animal(id) NOT NULL,
    date_time TIMESTAMP,
    comments TEXT,
    organization INTEGER REFERENCES organization(id) NOT NULL
);

CREATE TABLE animal_event_check_out (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id) NOT NULL,
    date_time TIMESTAMP,
    comments TEXT,
    organization INTEGER REFERENCES organization(id) NOT NULL
);

CREATE type event_general AS ENUM ('birthday', 'adoption', 'getting petted', 'going for a walk');
CREATE TABLE animal_event_general (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id) NOT NULL,
    date_time TIMESTAMP,
    comments TEXT,
    organization INTEGER REFERENCES organization(id) NOT NULL,
    type event_general,
    expenses NUMERIC
);

CREATE type event_medical AS ENUM ('deworm', 'vaccinate', 'surgery', 'antibiotics');
CREATE TABLE animal_event_medical_record (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id) NOT NULL,
    date_time TIMESTAMP,
    comments TEXT,
    organization INTEGER REFERENCES organization(id) NOT NULL,
    type event_medical,
    expenses NUMERIC
);
