ALTER TABLE animal_event_general
DROP COLUMN organization;

ALTER TABLE animal_event_medical_record
DROP COLUMN organization;

ALTER TABLE app_user DROP COLUMN organization,
DROP COLUMN role_type;

CREATE TABLE app_user_roles (
    user_id VARCHAR(256) REFERENCES app_user(id) NOT NULL,
    organization_id INTEGER REFERENCES organization(id) NOT NULL,
    role_type role_type DEFAULT 'Guest',
    PRIMARY KEY (user_id, organization_id)
);

INSERT INTO app_user_roles (user_id, organization_id, role_type) VALUES
    ('aiubfaw4io09', 1, 'Member'),
    ('afhu9w4f78', 2, 'Owner'),
    ('278y2378ryb', 2, 'Member'),
    ('0932hfdsa', 2, DEFAULT),
    ('dhjbwau74a6', 1, 'Owner');

ALTER TABLE organization
DROP COLUMN street,
DROP COLUMN house,
DROP COLUMN flat,
ADD COLUMN street_address VARCHAR(256);

UPDATE organization SET street_address = 'Mindaugo 12-1' WHERE id = 2;
UPDATE organization SET street_address = 'Ulrich Strasse 99' WHERE id = 3;
UPDATE organization SET street_address = 'Kalnų 38-5' WHERE id = 4;
UPDATE organization SET street_address = 'Vytauto 1a' WHERE id = 1;

CREATE TYPE registration_status AS ENUM ('Active', 'Inactive');

CREATE TABLE animal_registration (
    animal_id INTEGER REFERENCES animal(id),
    registration_no VARCHAR(256) NOT NULL,
    registration_date DATE NOT NULL,
    status registration_status DEFAULT 'Active',
    PRIMARY KEY (animal_id, registration_no)
);

INSERT INTO animal_registration (animal_id, registration_no, registration_date, status) VALUES
    (1, '123Svx', '2021-01-07', DEFAULT),
    (2, '321Hi', '2021-01-07', DEFAULT),
    (5, '999Mamba', '2021-01-07', DEFAULT),
    (4, '555Bob', '2021-01-07', DEFAULT),
    (3, '456Carl', '2021-01-07', DEFAULT);

CREATE TYPE chip_status AS ENUM ('Implanted', 'Removed');

CREATE TABLE animal_microchip (
    animal_id INTEGER REFERENCES animal(id),
    microchip_id VARCHAR(256) NOT NULL,
    chip_install_date DATE NOT NULL,
    status chip_status DEFAULT 'Implanted',
    PRIMARY KEY (animal_id, microchip_id)
);

INSERT INTO animal_microchip (animal_id, microchip_id, chip_install_date, status) VALUES
    (1, '123', '2020-08-11', DEFAULT),
    (2, '666666', '2020-09-01', DEFAULT),
    (5, '001010101', '2020-09-01', DEFAULT),
    (4, '29387', '2020-04-14', DEFAULT),
    (3, '2893402', '2020-03-01', DEFAULT);

CREATE TABLE animal_details (
    animal_id INTEGER PRIMARY KEY REFERENCES animal(id),
    breed_id INTEGER REFERENCES breed(id),
    name VARCHAR(128),
    gender gender,
    color INTEGER REFERENCES color(code),
    birth_date DATE,
    weight NUMERIC,
    allergy VARCHAR(128),
    food VARCHAR(256)
);

INSERT INTO animal_details (animal_id, breed_id, name, gender, color, birth_date, weight, allergy, food) VALUES
    (1, 205, 'Haskelis', '1', 61, '2020-08-01', 20, NULL, NULL),
    (2, 268, 'Jupyteris', '1', 2, '2020-01-01', 1, NULL, NULL),
    (5, 389, 'Murkė', '2', 4, '2019-09-16', 7, NULL, NULL),
    (4, 350, 'Javainis', '1', 68, '2020-01-01', 0.4, NULL, NULL),
    (3, 422, 'Pitoncas', '1', 32, '2020-01-01', 0.3, NULL, NULL);

ALTER TABLE animal
DROP COLUMN registration_no,
DROP COLUMN registration_date,
DROP COLUMN birth_date,
DROP COLUMN name,
DROP COLUMN species,
DROP COLUMN gender,
DROP COLUMN weight,
DROP COLUMN microchip_id,
DROP COLUMN chip_install_date,
DROP COLUMN allergy,
DROP COLUMN food,
DROP COLUMN breed,
DROP COLUMN color;
