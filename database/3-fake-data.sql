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
('Haskelis', 1, 'vaccinated', NULL), 
('Jupyteris', 2, 'sick', 'https://res.cloudinary.com/petbook-mvp/image/upload/v1616409417/fake-data/mmkxxjn1usqyiokcpxh8.jpg'),
('Pitoncas', 3, 'healthy', 'https://res.cloudinary.com/petbook-mvp/image/upload/v1616409467/fake-data/ovtg8cin5vzkvjnf9ot9.jpg'),
('Javainis', 3, 'adopted', 'https://res.cloudinary.com/petbook-mvp/image/upload/v1616409522/fake-data/qw3uotkxvupqfc5fo1al.jpg'),
('Murkė', 1, 'healthy', 'https://res.cloudinary.com/petbook-mvp/image/upload/v1616409529/fake-data/gn1tg08buymfp5ymt5mq.jpg'),
('Grikis', 1, 'healthy', 'https://res.cloudinary.com/petbook-mvp/image/upload/v1616409536/fake-data/mfgnms8mf6vvgmowsmfc.jpg');

INSERT INTO animal_details
(animal_id, breed_id, gender_id, color_id, birth_date, weight, allergy, food) VALUES
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
(animal_id, microchip_id, chip_company_code, install_date, install_place, status) VALUES
(1, '123', '1', '2020-08-11', '1', DEFAULT),
(2, '666666', '3', '2020-09-01', '2', DEFAULT),
(5, '001010101', '4', '2020-09-01', '4', DEFAULT),
(4, '29387', '5', '2020-04-14', '3', DEFAULT),
(3, '2893402', '6', '2020-03-01', '4', DEFAULT);

INSERT INTO animal_event_general
(animal, type, expenses, date_time, comments) VALUES
(2, '1', 109.03, '2020-07-01', 'Registration!'),
(1, '1', 32.85, '2020-07-01', 'Registration!'),
(1, '10', 246.08, '2020-07-02', 'Gavo švirkštą nuo pasiutligės.'),
(3, '1', 22.35, '2020-07-03', 'Registration!'),
(4, '1', 19.03, '2019-07-03', 'Registration!'),
(5, '1', 75.44, '2017-07-03', 'Registration!'),
(5, '11', 20.00, '2018-04-22', 'Labai supyko ant neblaivaus piliečio.'),
(5, '10', 246.08, '2018-04-25', 'Gavo švirkštą nuo pasiutligės.'),
(5, '2', 2.00, '2018-05-25', 'Pasikeitė laikytojas.'),
(5, '3', 1.00, '2018-05-25', 'Pasikeitė laikymo vietos adresas.'),
(5, '4', 2.00, '2018-05-30', 'Pasikeitė savininkas.'),
(5, '3', 1.00, '2018-05-30', 'Pasikeitė laikymo vietos adresas.'),
(5, '4', 2.00, '2018-06-04', 'Pasikeitė savininkas.'),
(5, '3', 1.00, '2018-07-14', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-15', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-16', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-17', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-18', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-19', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-20', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-21', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-23', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-22', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-24', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-25', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-26', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-27', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-28', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-29', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-30', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-07-31', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-08-01', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-08-02', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-08-03', 'Pasikeitė laikymo vietos adresas.'),
(5, '3', 1.00, '2018-08-04', 'Pasikeitė laikymo vietos adresas.');

INSERT INTO animal_event_medical_record
(animal, type, expenses, date_time, comments) VALUES
(4, '8', 26.74, '2020-05-21', 'Yearly vaccine');
