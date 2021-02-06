import { QueryConfig } from 'pg';
import { select, insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

interface AnimalRegistrationInput {
    animalId: number;
    registrationNo: String;
    registrationDate: String;
    status: 'Active' | 'Inactive';
}

export const getActiveAnimalRegistrationQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    registration_no,
                    registration_date,
                    status
                FROM public.animal_registration
                WHERE animal_id = $1
                AND status = 'Active';`;

    const query = {
        text,
        values: [id],
    };

    return query;
};

export const createAnimalRegistrationQuery = (input: AnimalRegistrationInput): QueryConfig => {
    const text = `
        INSERT INTO public.animal_registration
        (
            animal_id,
            registration_no,
            registration_date,
            status
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4
        )
        RETURNING
            animal_id,
            registration_no,
            registration_date,
            status;`;
  
    const query = {
      text,
      values: [
        input.animalId,
        input.registrationNo,
        input.registrationDate,
        input.status,
      ],
    };
  
    return query;
};

export const updateAnimalRegistrationQuery = (input: AnimalRegistrationInput): QueryConfig => {
    console.log('input:', input)

    return update('animal_registration', snakeCaseKeys(input))
    .where({ animal_id: input.animalId })
    .returning(
        'animal_id, registration_no, registration_date, status'
    )
    .toParams();

    let inputAdjusted = snakeCaseKeys(input);
    
    const text = `
        UPDATE public.animal_registration SET
            animal_id = $1,
            registration_no = $2,
            registration_date = $3,
            status = $4
        RETURNING
            animal_id,
            registration_no,
            registration_date,
            status;`;
    
    const query = {
      text,
      values: [
        inputAdjusted.animal_id,
        inputAdjusted.registration_no,
        inputAdjusted.registration_date,
        inputAdjusted.status,
      ],
    };
  
    return query;
};
