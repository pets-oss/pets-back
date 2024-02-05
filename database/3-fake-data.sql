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
('0932hfdsa', 'Mamba', 'Green', 'Jungleen', 'hi@hello.lt'),
('userIdForTesting', 'Azis', 'Ąžuolas', 'Krušna', 'hi@hello.lt'),
('userIdForTestingNoFavoriteAnimals', 'Tiesto', 'Testas', 'Doe', 'tiesto@testai.lt');

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

-- ANIMAL FAVORITE

INSERT INTO animal_favorite
(user_id, animal_id) VALUES
('dhjbwau74a6', 1),
('aiubfaw4io09', 1),
('aiubfaw4io09', 4),
('afhu9w4f78', 2),
('278y2378ryb', 3),
('userIdForTesting', 1),
('userIdForTesting', 2),
('userIdForTesting', 3);

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

INSERT INTO event_streetfind
(registration_date, registration_no, street, house_no, municipality_id, date_time, animal_id, comments, author) VALUES
('2021-01-01', '123CovidXXYZ', 'Vilniaus g.', NULL, 15, '2019-07-03', 4, NULL, 'aiubfaw4io09'),
('2021-01-01', '124CovidXYYZ', 'Maironio g.', '3', 15, '2018-08-04', 5, NULL, 'dhjbwau74a6');

INSERT INTO event_giveaway
(registration_date, registration_no, former_owner_id, reason, date_time, animal_id, author) VALUES
('2021-01-02', 'ABDCovidXXYZ', 1, 'Have to go abroad', '2021-01-07', 1, '0932hfdsa'),
('2021-01-02', '123Covid123', 2, 'Išvyksta į užsienį', '2021-01-01', 2, 'afhu9w4f78'),
('2021-01-03', '222222', 3, 'Įsikėlė į butą, kuriame draudžia plaukuotus augintinius', '2021-01-07', 3, 'dhjbwau74a6');

INSERT INTO event_medication (treatment, expenses, animal_id, date_time, author, comments) VALUES
('Some pills from Tick', 15.00, 1, '2020-05-21', '278y2378ryb', 'Tick medications'),
('Some pills from Tick', 7.89, 2, '2020-05-22', 'aiubfaw4io09', 'Tick medications'),
('Some pills from Tick', 171.10, 3, '2020-05-21', 'dhjbwau74a6', 'Tick medications'),
('Some pills from Tick', 34.05, 4, '2020-05-21', 'afhu9w4f78', 'Tick medications');

INSERT INTO event_surgery (surgery, result, expenses, animal_id, date_time, author) VALUES
('Knee', 'Successful', 150.00, 1, '2020-05-21', '278y2378ryb'),
('Kidney', 'Successful', 345.05, 4, '2020-05-21', 'afhu9w4f78');

-- EVENT TYPE

INSERT INTO event_type_translation
(event_type, language, translation) VALUES
('Giveaway', 'lt', 'Atidavimas'),
('Streetfind', 'lt', 'Radimas gatvėje'),
('Rescue', 'lt', 'Išgelbėjimas'),
('Birth', 'lt', 'Gimimas'),
('Adoption', 'lt', 'Priglaudimas'),
('Death', 'lt', 'Mirtis'),
('TemporaryCare', 'lt', 'Laikina globa'),
('Microchipping', 'lt', 'Čipavimas'),
('Medication', 'lt', 'Medikamentai'),
('Prophylaxis', 'lt', 'Profilaktika'),
('Surgery', 'lt', 'Operacija'),
('Neutering', 'lt', 'Sterilizacija'),
('Inspection', 'lt', 'Patikra');

-- EVENT GROUP

INSERT INTO event_group_translation
(event_group, language, translation) VALUES
('General', 'lt', 'Bendri'),
('Medical', 'lt', 'Medicininiai'),
('Registration', 'lt', 'Registracijos');
