import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';
import { AnimalRegistrationInput } from './animalRegistration';
import { AnimalDetailsInput } from './animalDetails';
import { AnimalMicrochipInput } from './animalMicrochip';

const table = 'animal';
const returnFields =
    'id, name, organization, status, image_url, comments, mod_time';

interface CreateAnimalInput {
    name: String;
    organization: number;
    status: String;
    image_url: String;
    comments: String;
    registration: AnimalRegistrationInput;
    details: AnimalDetailsInput;
    microchip: AnimalMicrochipInput;
}

interface UpdateAnimalInput {
    id: number;
    name: String;
    organization: number;
    status: String;
    image_url: String;
    comments: String;
    registration: AnimalRegistrationInput;
    details: AnimalDetailsInput;
    microchip: AnimalMicrochipInput;
}

interface DeleteAnimalInput {
    id: number;
}

export const getAnimalQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    id,
                    name,
                    organization,
                    status,
                    image_url,
                    comments,
                    mod_time
                FROM ${table}
                WHERE id = $1;`;

    const query = {
        text,
        values: [id],
    };

    return query;
};

export const getAnimalsQuery = (
    ids: [number] | null,
    species: [number] | null,
    gender: [number] | null,
    breed: [number] | null
): QueryConfig => {
    const text = `
        SELECT
            ${table}.id,
            ${table}.name,
            ${table}.organization,
            ${table}.status,
            ${table}.image_url,
            ${table}.comments,
            ${table}.mod_time
        FROM ${table}
        JOIN animal_details AS ad
            ON ${table}.id = ad.animal_id
        JOIN breed AS b
            ON ad.breed_id = b.id
        WHERE ($1::int[] IS NULL OR ${table}.id = ANY ($1))
            AND ($2::species[] IS NULL OR b.species = ANY ($2))
            AND ($3::gender[] IS NULL OR ad.gender_id = ANY ($3))
            AND ($4::int[] IS NULL OR ad.breed_id = ANY ($4));
    `;

    const query = {
        text,
        values: [
            ids,
            species,
            gender,
            breed
        ]
    };

    return query;
};

export const createAnimalQuery = (input: CreateAnimalInput): QueryConfig => {
    const { registration, details, microchip, ...animal } = input;
    return insert(table, snakeCaseKeys(animal))
        .returning(returnFields)
        .toParams();
};

export const updateAnimalQuery = (input: UpdateAnimalInput): QueryConfig => {
    const { registration, details, microchip, ...animal } = input;
    return update(table, snakeCaseKeys(animal))
        .where({ id: input.id })
        .returning(returnFields)
        .toParams();
};

export const deleteAnimalQuery = (input: DeleteAnimalInput): QueryConfig => {
    const text = `DELETE FROM ${table}
                  WHERE id = $1
                  RETURNING
                  ${returnFields};`;

    const query = {
        text,
        values: [input.id],
    };

    return query;
};
