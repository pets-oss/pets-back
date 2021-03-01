import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'animal_registration';
const returnFields = 'animal_id, registration_no, registration_date, status';

enum AnimalRegistrationStatus {
    Active,
    Inactive,
}

export interface AnimalRegistrationInput {
    animalId: number;
    registrationNo: String;
    registrationDate: String;
    status: AnimalRegistrationStatus;
}

export const getActiveAnimalRegistrationQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    registration_no,
                    registration_date,
                    status
                FROM ${table}
                WHERE animal_id = $1
                    AND status = 'Active';`;

    const query = {
        text,
        values: [id],
    };

    return query;
};

export const createAnimalRegistrationQuery = (
    input: AnimalRegistrationInput
): QueryConfig =>
    insert(table, snakeCaseKeys(input)).returning(returnFields).toParams();

export const updateAnimalRegistrationQuery = (
    input: AnimalRegistrationInput
): QueryConfig =>
    update(table, snakeCaseKeys(input))
        .where({
            animal_id: input.animalId,
        })
        .returning(returnFields)
        .toParams();

export const deleteAnimalRegistrationQuery = (id: number): QueryConfig => {
    const text = `DELETE
                FROM ${table}
                WHERE animal_id = $1
                RETURNING
                    animal_id,
                    registration_no,
                    registration_date,
                    status;`;

    const query = {
        text,
        values: [id],
    };

    return query;
};
