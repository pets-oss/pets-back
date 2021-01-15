-- ORGANIZATION

INSERT INTO organization
(name, country, city, street_address, phone) VALUES
('Haskelis', 'Lietuva', 'Kaunas', 'Vytauto 1a', '1141184'),
('Jupyteris', 'Lietuva', 'Paryžius', 'Mindaugo 12-1', '+371'),
('Javainis', 'Lietuva', 'Šveicarija', 'Ulrich Strasse 99', '+80871'),
('Pitoncas', 'Vokietija', 'Konstanca', 'Kalnų 38-5', '0044371');

-- USER

INSERT INTO app_user
(id, username, name, surname, email) VALUES
('dhjbwau74a6', 'Svx', 'Sveikas', 'Ūsas', 'green@mamba.lt'),
('aiubfaw4io09', 'Hi', 'Hello', 'Letena', 'hi@hi.lt'),
('afhu9w4f78', 'Carl', 'Red', 'Gauras', 'hi@hi.lt'),
('278y2378ryb', 'Bob', 'Blue', 'Eyes', 'hi@hi.lt'),
('0932hfdsa', 'Mamba', 'Green', 'Jungleen', 'hi@hello.lt');

INSERT INTO app_user_roles
(user_id, organization_id, role_type) VALUES
('aiubfaw4io09', 1, 'Member'),
('afhu9w4f78', 2, 'Owner'),
('278y2378ryb', 2, 'Member'),
('0932hfdsa', 2, DEFAULT),
('dhjbwau74a6', 1, 'Owner');

-- ANIMAL

INSERT INTO animal
(name, organization, status, image_url) VALUES
('Haskelis', 1, 'vaccinated', 'www.green.mamba'),
('Jupyteris', 2, 'sick', 'www.url.lt'),
('Pitoncas', 3, 'healthy', 'www.url.lt'),
('Javainis', 3, 'adopted', 'www.url.lt'),
('Murkė', 1, 'healthy', 'www.url.lt');

INSERT INTO animal_details
(animal_id, breed_id, gender, color, birth_date, weight, allergy, food) VALUES
(1, 205, '1', 61, '2020-08-01', 20, NULL, NULL),
(2, 268, '1', 2, '2020-01-01', 1, NULL, NULL),
(5, 389, '2', 4, '2019-09-16', 7, NULL, NULL),
(4, 350, '1', 68, '2020-01-01', 0.4, NULL, NULL),
(3, 422, '1', 32, '2020-01-01', 0.3, NULL, NULL);

INSERT INTO animal_registration
(animal_id, registration_no, registration_date, status) VALUES
(1, '123Svx', '2021-01-07', DEFAULT),
(2, '321Hi', '2021-01-07', DEFAULT),
(5, '999Mamba', '2021-01-07', DEFAULT),
(4, '555Bob', '2021-01-07', DEFAULT),
(3, '456Carl', '2021-01-07', DEFAULT);

INSERT INTO animal_microchip
(animal_id, microchip_id, chip_install_date, status) VALUES
(1, '123', '2020-08-11', DEFAULT),
(2, '666666', '2020-09-01', DEFAULT),
(5, '001010101', '2020-09-01', DEFAULT),
(4, '29387', '2020-04-14', DEFAULT),
(3, '2893402', '2020-03-01', DEFAULT);

-- EVENTS

INSERT INTO event_translation
(event, language, translation) VALUES
('1', 'lt', 'Pirminė registracija'),
('2', 'lt', 'Naujas laikytojas'),
('3', 'lt', 'Nauja laikymo vieta'),
('4', 'lt', 'Naujas savininkas'),
('5', 'lt', 'Pavogimas'),
('6', 'lt', 'Gaišimas'),
('7', 'lt', 'Išvežimas į užsienį'),
('8', 'lt', 'Vakcinavimas'),
('9', 'lt', 'Agresyvumas');

INSERT INTO animal_event_general
(animal, type, expenses, date_time, comments) VALUES
(2, '1', 109.03, '2020-07-01', 'Registration!');

INSERT INTO animal_event_medical_record
(animal, type, expenses, date_time, comments) VALUES
(4, '8', 26.74, '2020-05-21', 'Yearly vaccine');
