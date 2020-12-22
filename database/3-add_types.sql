ALTER TYPE species ADD VALUE 'ferret';
UPDATE animal SET species = 'cat' WHERE species = 'parrot';
UPDATE animal SET species = 'cat' WHERE species = 'snake';
UPDATE animal SET species = 'ferret' WHERE species = 'hamster';
ALTER TYPE species RENAME TO species_old;

CREATE TYPE species AS ENUM ('dog', 'cat', 'ferret');
ALTER TABLE animal ALTER COLUMN species TYPE species USING species::text::species;
DROP TYPE species_old;

ALTER TABLE animal DROP COLUMN breed;
DROP type breed;
CREATE TABLE breed (
    id INTEGER,
    species species,
    code VARCHAR(3),
    PRIMARY KEY(id, code)
);

INSERT INTO breed (id, species, code)
VALUES
(360, 'cat', 'ABY'),
(389, 'cat', 'ABL');