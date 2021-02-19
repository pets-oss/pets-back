-- ORGANIZATION

CREATE TABLE organization (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    country VARCHAR(128),
    city VARCHAR(128),
    street_address VARCHAR(256),
    phone VARCHAR(64),
    mod_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    delete_time TIMESTAMP
);

-- USER

CREATE TABLE app_user (
    id VARCHAR(256) PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    name VARCHAR(256),
    surname VARCHAR(256),
    email VARCHAR(128),
    mod_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE role_type AS ENUM ('Owner', 'Member', 'Reader', 'Guest');

CREATE TABLE app_user_roles (
    user_id VARCHAR(256) REFERENCES app_user(id) NOT NULL,
    organization_id INTEGER REFERENCES organization(id) NOT NULL,
    role_type role_type DEFAULT 'Guest',
    PRIMARY KEY (user_id, organization_id)
);

-- SPECIES

CREATE TYPE species AS ENUM ('1', '2', '3', '4', '8', '10', '11', '13', '14');

CREATE TABLE species_translation (
    species species NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(50) NOT NULL,
    PRIMARY KEY (species, language)
);
COMMENT ON COLUMN species_translation.language is 'Language code based on BCP 47';

-- BREED CATEGORY

CREATE TABLE breed_category (
    id INTEGER PRIMARY KEY,
    species species NOT NULL
);

CREATE TABLE breed_category_translation (
    breed_category INTEGER REFERENCES breed_category(id) NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(50) NOT NULL,
    PRIMARY KEY (breed_category, language)
);
COMMENT ON COLUMN breed_category_translation.language is 'Language code based on BCP 47';

-- BREED

CREATE TABLE breed (
    id INTEGER PRIMARY KEY,
    abbreviation VARCHAR(7) NOT NULL,
    species species NOT NULL
);

CREATE TABLE breed_translation (
    breed INTEGER REFERENCES breed(id) NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(50) NOT NULL,
    PRIMARY KEY (breed, language)
);
COMMENT ON COLUMN breed_translation.language is 'Language code based on BCP 47';

-- GENDER

CREATE TYPE gender AS ENUM ('1', '2', '3', '4');

CREATE TABLE gender_translation (
    gender gender NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(20) NOT NULL,
    PRIMARY KEY (gender, language)
);
COMMENT ON COLUMN gender_translation.language is 'Language code based on BCP 47';

-- DISEASE

CREATE TABLE disease (
    code INTEGER PRIMARY KEY,
    species species NOT NULL
);

CREATE TABLE disease_translation (
    disease INTEGER REFERENCES disease(code) NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(64) NOT NULL,
    PRIMARY KEY (disease, language)
);
COMMENT ON COLUMN disease_translation.language is 'Language code based on BCP 47';

-- COLOR

CREATE TABLE color (
    code INTEGER PRIMARY KEY,
    species species NOT NULL
);

CREATE TABLE color_translation (
    color INTEGER REFERENCES color(code) NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(64) NOT NULL,
    PRIMARY KEY (color, language)
);
COMMENT ON COLUMN color_translation.language is 'Language code based on BCP 47';

-- COLOR PATTERN

CREATE TABLE color_pattern (
    code INTEGER NOT NULL,
    species species NOT NULL,
    PRIMARY KEY (code, species)
);

CREATE TABLE color_pattern_translation (
    color_pattern INTEGER NOT NULL,
    species species NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(256) NOT NULL,
    PRIMARY KEY (color_pattern, species, language),
    FOREIGN KEY (color_pattern, species) REFERENCES color_pattern (code, species)
);
COMMENT ON COLUMN color_pattern_translation.language is 'Language code based on BCP 47';

-- ANIMAL

CREATE TYPE status AS ENUM ('healthy', 'vaccinated', 'sick', 'adopted');

CREATE TABLE animal (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    organization INTEGER REFERENCES organization(id) NOT NULL,
    status status,
    image_url VARCHAR(512),
    comments TEXT,
    mod_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE animal_details (
    animal_id INTEGER PRIMARY KEY REFERENCES animal(id),
    breed_id INTEGER REFERENCES breed(id),
    gender_id gender,
    color_id INTEGER REFERENCES color(code),
    birth_date DATE,
    weight NUMERIC,
    allergy VARCHAR(128),
    food VARCHAR(256)
);

CREATE TYPE registration_status AS ENUM ('Active', 'Inactive');

CREATE TABLE animal_registration (
    animal_id INTEGER PRIMARY KEY REFERENCES animal(id),
    registration_no VARCHAR(256) NOT NULL UNIQUE,
    registration_date DATE DEFAULT CURRENT_DATE,
    status registration_status DEFAULT 'Active',
    mod_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE chip_company_code AS ENUM ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');

CREATE TABLE chip_company_translation (
    chip_company_code chip_company_code NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(64) NOT NULL,
    PRIMARY KEY (chip_company_code, language)
);
COMMENT ON COLUMN chip_company_translation.language is 'Language code based on BCP 47';

CREATE TYPE install_place AS ENUM ('1', '2', '3', '4');

CREATE TABLE install_place_translation (
    install_place install_place NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(64) NOT NULL,
    PRIMARY KEY (install_place, language)
);
COMMENT ON COLUMN install_place_translation.language is 'Language code based on BCP 47';

CREATE TYPE chip_status AS ENUM ('Implanted', 'Removed');

CREATE TABLE animal_microchip (
    animal_id INTEGER REFERENCES animal(id) NOT NULL,
    microchip_id VARCHAR(256) NOT NULL,
    chip_company_code chip_company_code NOT NULL,
    install_date DATE,
    install_place install_place NOT NULL,
    status chip_status DEFAULT 'Implanted',
    PRIMARY KEY (animal_id, microchip_id)
);

CREATE TABLE status_translation (
    status VARCHAR(20) NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(20) NOT NULL,
    PRIMARY KEY (status, language)
);

COMMENT ON COLUMN status_translation.language is 'Language code based on BCP 47';


-- EVENTS

CREATE TYPE event AS ENUM ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11');

CREATE TABLE event_translation (
    event event NOT NULL,
    language VARCHAR(4) NOT NULL,
    translation VARCHAR(50) NOT NULL,
    PRIMARY KEY (event, language)
);
COMMENT ON COLUMN event_translation.language is 'Language code based on BCP 47';

CREATE TABLE animal_event_general (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id) NOT NULL,
    type event,
    expenses NUMERIC,
    date_time TIMESTAMP,
    comments TEXT
);

CREATE TABLE animal_event_medical_record (
    id SERIAL PRIMARY KEY,
    animal INTEGER REFERENCES animal(id) NOT NULL,
    type event,
    expenses NUMERIC,
    date_time TIMESTAMP,
    comments TEXT
);

-- DATE UPDATES

CREATE EXTENSION moddatetime;

CREATE TRIGGER organization_mod_time BEFORE UPDATE ON organization
FOR EACH ROW EXECUTE PROCEDURE moddatetime (mod_time);

CREATE TRIGGER app_user_mod_time BEFORE UPDATE ON app_user
FOR EACH ROW EXECUTE PROCEDURE moddatetime (mod_time);

CREATE TRIGGER animal_mod_time BEFORE UPDATE ON animal
FOR EACH ROW EXECUTE PROCEDURE moddatetime (mod_time);

CREATE TRIGGER animal_registration_mod_time BEFORE UPDATE ON animal_registration
FOR EACH ROW EXECUTE PROCEDURE moddatetime (mod_time);
