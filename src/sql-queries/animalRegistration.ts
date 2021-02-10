import { QueryConfig } from 'pg';
import { insert, update, isNull } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'animal_registration'
const returnFields = 'animal_id, registration_no, registration_date, status';

enum AnimalRegistrationStatus {
    Active,
    Inactive
}

interface CreateAnimalRegistrationInput {
    animalId: number;
    registrationNo: String;
    registrationDate: String;
    status: AnimalRegistrationStatus;
}

interface UpdateAnimalRegistrationInput {
    animalId: number;
    registrationNo: String;
    newRegistrationNo?: String;
    registrationDate: String;
    status: AnimalRegistrationStatus;
}

interface AnimalRegistrationDeleteInput {
    animalId: number;
    registrationNo: String;
}

export const getActiveLastAnimalRegistrationQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    registration_no,
                    registration_date,
                    status
                FROM ${table}
                WHERE animal_id = $1
                    AND delete_time IS NULL
                    AND status = 'Active'
                ORDER BY registration_date DESC;`;

    const query = {
        text,
        values: [id],
    };

    return query;
};

export const getActiveAnimalRegistrationsQuery = (id: number): QueryConfig => {
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

export const createAnimalRegistrationQuery = (input: CreateAnimalRegistrationInput): QueryConfig =>
    insert(table, snakeCaseKeys(input))
    .returning(returnFields)
    .toParams();

export const undeleteAnimalRegistrationQuery = (input: AnimalRegistrationDeleteInput): QueryConfig => 
    update(table, 
        {...{ delete_time: null }, ...snakeCaseKeys(input)}
    )
    .where({ animal_id: input.animalId, registration_no: input.registrationNo })
    .returning('animal_id, registration_no')
    .toParams();

export const updateAnimalRegistrationQuery = (input: UpdateAnimalRegistrationInput): QueryConfig => {
    let inputUpdatedRegistrationNo = { ...input };
    inputUpdatedRegistrationNo.registrationNo = inputUpdatedRegistrationNo.newRegistrationNo ? 
        inputUpdatedRegistrationNo.newRegistrationNo : inputUpdatedRegistrationNo.registrationNo;
    delete inputUpdatedRegistrationNo.newRegistrationNo;

    return update(table, snakeCaseKeys(inputUpdatedRegistrationNo))
    .where({ animal_id: inputUpdatedRegistrationNo.animalId, registration_no: input.registrationNo })
    .returning(returnFields)
    .toParams();
}

export const deleteAnimalRegistrationQuery = (input: AnimalRegistrationDeleteInput): QueryConfig =>
    update(table, { delete_time: 'NOW()' })
    .where({ 
        animal_id: input.animalId, 
        registration_no: input.registrationNo,
    }, isNull('delete_time'))
    .returning('animal_id, registration_no')
    .toParams();
