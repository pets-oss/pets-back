import { QueryConfig } from 'pg';
import { insert, update, isNull } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'animal_registration'
const returnFields = 'animal_id, registration_no, registration_date, status';

enum AnimalRegistrationStatus {
    Active,
    Inactive
}

interface AnimalRegistrationInput {
    animalId: number;
    registrationNo: String;
    registrationDate: String;
    status: AnimalRegistrationStatus;
}

interface AnimalRegistrationDeleteInput {
    animalId: number;
    registrationNo: String;
}

export const getActiveAnimalRegistrationQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    registration_no,
                    registration_date,
                    status
                FROM ${table}
                WHERE animal_id = $1
                    AND delete_time IS NULL
                    AND status = 'Active';`;

    const query = {
        text,
        values: [id],
    };

    return query;
};

export const createAnimalRegistrationQuery = (input: AnimalRegistrationInput): QueryConfig => {
    return insert(table, snakeCaseKeys(input))
    .returning(returnFields)
    .toParams();
};

export const isAnimalRegistrationQuery = (input: AnimalRegistrationInput): QueryConfig => {
    const snakeInput = snakeCaseKeys(input);
    const text = `SELECT
                    animal_id,
                    registration_no,
                    delete_time
                FROM ${table}
                WHERE animal_id = $1
                    AND registration_no = $2;`;

    const query = {
        text,
        values: [
            snakeInput.animal_id,
            snakeInput.registration_no,
        ],
    };

    return query;
};

export const undeleteAnimalRegistrationQuery = (input: AnimalRegistrationInput): QueryConfig => 
    update(table, 
        Object.assign({ delete_time: null }, snakeCaseKeys(input))
    )
    .where({ animal_id: input.animalId, registration_no: input.registrationNo })
    .returning(returnFields)
    .toParams();

export const updateAnimalRegistrationQuery = (input: AnimalRegistrationInput): QueryConfig => {
    return update(table, snakeCaseKeys(input))
    .where({ animal_id: input.animalId })
    .returning(returnFields)
    .toParams();
};

export const deleteAnimalRegistrationQuery = (input: AnimalRegistrationDeleteInput): QueryConfig => {
  return update(table, { delete_time: 'NOW()' })
    .where({ 
        animal_id: input.animalId, 
        registration_no: input.registrationNo,
    }, isNull('delete_time'))
    .returning('animal_id, registration_no')
    .toParams();
}