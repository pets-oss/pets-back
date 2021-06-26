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
('Haskelis', 1, 'vaccinated', 'https://res.cloudinary.com/petbook-mvp/image/upload/v1616409417/fake-data/mmkxxjn1usqyiokcpxh8.jpg'),
('Jupyteris', 2, 'sick', 'https://res.cloudinary.com/petbook-mvp/image/upload/v1616409467/fake-data/ovtg8cin5vzkvjnf9ot9.jpg'),
('Pitoncas', 3, 'healthy', 'https://res.cloudinary.com/petbook-mvp/image/upload/v1616409522/fake-data/qw3uotkxvupqfc5fo1al.jpg'),
('Javainė', 3, 'adopted', 'https://res.cloudinary.com/petbook-mvp/image/upload/v1616409529/fake-data/gn1tg08buymfp5ymt5mq.jpg'),
('Murkė', 1, 'healthy', 'https://res.cloudinary.com/petbook-mvp/image/upload/v1616409536/fake-data/mfgnms8mf6vvgmowsmfc.jpg'),
('Grikis', 1, 'healthy', NULL);

INSERT INTO animal_details
(animal_id, breed_id, gender_id, color_id, birth_date, weight, allergy, food) VALUES
(1, 205, '2', 61, '2020-08-01', 20, NULL, NULL),
(2, 268, '2', 2, '2020-01-01', 1, NULL, NULL),
(5, 389, '1', 4, '2019-09-16', 7, NULL, NULL),
(4, 350, '1', 68, '2020-01-01', 0.4, NULL, NULL),
(3, 422, '2', 32, '2020-01-01', 0.3, NULL, NULL);

INSERT INTO animal_registration
(animal_id, registration_no, registration_date, status) VALUES
(1, '123Svx', '2021-01-07', DEFAULT),
(2, '321Hi', '2021-01-07', DEFAULT),
(5, '999Mamba', '2018-08-04', DEFAULT),
(4, '555Bob', '2019-07-03', DEFAULT),
(3, '456Carl', '2021-01-07', DEFAULT);

INSERT INTO animal_microchip
(animal_id, microchip_id, chip_company_code, install_date, install_place_id, status) VALUES
(1, '123', '1', '2020-08-11', '1', DEFAULT),
(2, '666666', '3', '2020-09-01', '2', DEFAULT),
(5, '001010101', '4', '2020-09-01', '4', DEFAULT),
(4, '29387', '5', '2020-04-14', '3', DEFAULT),
(3, '2893402', '6', '2020-03-01', '4', DEFAULT);

INSERT INTO animal_event_general
(animal_id, type, expenses, date_time, comments, author) VALUES
(2, 'CheckIn', 109.03, '2020-07-01', 'Registration!', 'dhjbwau74a6'),
(1, 'CheckIn', 32.85, '2020-07-01', 'Registration!', 'aiubfaw4io09'),
(3, 'CheckIn', 22.35, '2020-07-03', 'Registration!', 'afhu9w4f78'),
(4, 'CheckIn', 19.03, '2019-07-03', 'Registration!', '278y2378ryb'),
(5, 'CheckIn', 75.44, '2017-07-03', 'Registration!', '0932hfdsa'),
(5, 'CheckOut', 2.00, '2018-05-25', 'Pasikeitė laikytojas.', 'dhjbwau74a6'),
(5, 'CheckOut', 2.00, '2018-05-30', 'Pasikeitė savininkas.', 'aiubfaw4io09'),
(5, 'CheckOut', 2.00, '2018-06-04', 'Pasikeitė savininkas.', 'dhjbwau74a6');

INSERT INTO animal_event_medical_record
(animal_id, type, expenses, date_time, comments, author) VALUES
(4, 'Prophylaxis', 26.74, '2020-05-21', 'Yearly vaccine', '278y2378ryb');

-- ANIMAL FAVORITE

INSERT INTO animal_favorite
(user_id, animal_id) VALUES
('dhjbwau74a6', 1),
('aiubfaw4io09', 1),
('aiubfaw4io09' ,4),
('afhu9w4f78', 2),
('278y2378ryb', 3);

-- ORGANIZATION TASK

INSERT INTO organization_task
(title, description, organization_id, is_done) VALUES
('Vet for Murkė', 'Place: Kaunakiemio g. 15a', 1, DEFAULT),
('Vet for Kordzis', 'Place: Partizanu g. 16a', 1, DEFAULT),
('Take away trash', 'Trash should be put in the container. Container can be found near the southern wall of the shelter', 1, DEFAULT),
('Pet dog Rudolf', 'Dog Rudolf starts to bark everyday at 12:00 if it doesnt get pat in the morning. Barking never stops.', 1, DEFAULT),
('Order cat food', 'Cat food is running out. Order ASAP!', 1, true),
('Dye hair for Dag', 'Place: Kaunakiemio g. 15a', 1, DEFAULT);

-- ANIMAL GALLERY

INSERT INTO animal_gallery
(animal_id, url) VALUES
(5, 'https://picsum.photos/id/237/300/300'),
(1, 'https://picsum.photos/id/237/300/300'),
(2, 'https://picsum.photos/id/237/300/300');

-- ANIMAL OWNER

INSERT INTO animal_owner
(name, surname, phone) VALUES
('Laisvyda', 'Katmeilė', '1234'),
('Bonifacas', 'Tabletė', '4321'),
('Konfucijas', 'Šunmylys', '+000999');

-- ORGANIZATION CAGE

INSERT INTO organization_cage (name, organization_id) VALUES
('Buda1', 1),
('Buda2', 1),
('Narvas1', 1),
('2-1', 2),
('3-small-1', 3),
('3-big-1', 3);

-- ANIMAL CAGE

INSERT INTO animal_cage (animal_id, cage_id) VALUES
(1, 1),
(5, 2),
(6, 3),
(2, 4),
(3, 5),
(4, 6);

-- EVENT

INSERT INTO microchipping_event_details
(microchip_id) VALUES
('123'),
('666666'),
('001010101'),
('29387'),
('2893402');

INSERT INTO event_streetfind
(registration_date, registration_no, street, house_no, municipality_id, date_time, animal_id, comments, author) VALUES
('2021-01-01', '123CovidXXYZ', 'Vilniaus g.', NULL, 15, '2019-07-03', 4, NULL, 'aiubfaw4io09'),
('2021-01-01', '124CovidXYYZ', 'Maironio g.', '3', 15, '2018-08-04', 5, NULL, 'dhjbwau74a6');

INSERT INTO event_giveaway
(registration_date, registration_no, former_owner_id, reason, date_time, animal_id, author) VALUES
('2021-01-02', 'ABDCovidXXYZ', 1, 'Have to go abroad', '2021-01-07', 1, '0932hfdsa'),
('2021-01-02', '123Covid123', 2, 'Išvyksta į užsienį', '2021-01-01', 2, 'afhu9w4f78'),
('2021-01-03', '222222', 3, 'Įsikėlė į butą, kuriame draudžia plaukuotus augintinius', '2021-01-07', 3, 'dhjbwau74a6');

INSERT INTO event_location_change (street, house_no, municipality_id, animal_id, date_time, comments, author) VALUES
('Vytauto g.', '12', 1, 5, '2018-07-14', 'Pasikeitė laikymo vietos adresas.', '0932hfdsa'),
('Vytauto g.', '13', 1, 2, '2018-07-15', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vytauto g.', '2', 1, 5, '2018-07-16', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vokiečių g.', '3', 1, 5, '2018-07-17', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vytauto g.', '14', 1, 5, '2018-07-18', 'Pasikeitė laikymo vietos adresas.', 'afhu9w4f78'),
('Vytauto g.', '4', 1, 5, '2018-07-19', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vytauto g.', '1c', 1, 5, '2018-07-20', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vytauto g.', '9', 1, 5, '2018-07-21', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vytauto g.', '1b', 1, 5, '2018-07-23', 'Pasikeitė laikymo vietos adresas.', 'aiubfaw4io09'),
('Vytauto g.', '1', 1, 1, '2018-07-22', 'Pasikeitė laikymo vietos adresas.', '278y2378ryb'),
('Vytauto g.', '5', 1, 5, '2018-07-24', 'Pasikeitė laikymo vietos adresas.', '0932hfdsa'),
('Prancūzų g.', '1', 1, 5, '2018-07-25', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vytauto g.', '1', 1, 5, '2018-07-26', 'Pasikeitė laikymo vietos adresas.', 'afhu9w4f78'),
('Sapiegos g.', '1a', 1, 5, '2018-07-27', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vytauto g.', '1', 1, 5, '2018-07-28', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vytauto g.', '16', 1, 5, '2018-07-29', 'Pasikeitė laikymo vietos adresas.', 'aiubfaw4io09'),
('Vytauto g.', '32', 1, 5, '2018-07-30', 'Pasikeitė laikymo vietos adresas.', '278y2378ryb'),
('Vytauto g.', '1', 1, 5, '2018-07-31', 'Pasikeitė laikymo vietos adresas.', '0932hfdsa'),
('Vytauto g.', '15', 1, 5, '2018-08-01', 'Pasikeitė laikymo vietos adresas.', 'afhu9w4f78'),
('Vytauto g.', '2', 1, 4, '2018-08-02', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vytauto g.', '1', 1, 5, '2018-08-03', 'Pasikeitė laikymo vietos adresas.', 'dhjbwau74a6'),
('Vytauto g.', '1a', 1, 5, '2018-08-04', 'Pasikeitė laikymo vietos adresas.', 'afhu9w4f78');

INSERT INTO event_medication (treatment, expenses, animal_id, date_time, author, comments) VALUES
('Some pills from Tick', 15.00, 1, '2020-05-21', '278y2378ryb', 'Tick medications'),
('Some pills from Tick', 7.89, 2, '2020-05-22', 'aiubfaw4io09', 'Tick medications'),
('Some pills from Tick', 171.10, 3, '2020-05-21', 'dhjbwau74a6', 'Tick medications'),
('Some pills from Tick', 34.05, 4, '2020-05-21', 'afhu9w4f78', 'Tick medications');

INSERT INTO event_surgery (result, expenses, animal_id, date_time, author, comments) VALUES
('Successful', 150.00, 1, '2020-05-21', '278y2378ryb', 'Knee surgery'),
('Successful', 345.05, 4, '2020-05-21', 'afhu9w4f78', 'Tumor surgery');
