import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'animal_details';
const returnFields =
    'animal_id, breed_id, gender_id, color_id, birth_date, weight, allergy, food';

export interface AnimalDetailsInput {
    animalId: number;
    breedId: number;
    genderId: number;
    colorId: number;
    birth_date: String;
    weight: number;
    allergy: String;
    food: String;
}

export const getAnimalDetailsQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    breed_id,
                    gender_id,
                    color_id,
                    birth_date,
                    weight,
                    allergy,
                    food
                FROM public.animal_details
                WHERE animal_id = $1;`;

    const query = {
        text,
        values: [id],
    };

    return query;
};

export const createAnimalDetailsQuery = (
    input: AnimalDetailsInput
): QueryConfig =>
    insert(table, snakeCaseKeys(input)).returning(returnFields).toParams();

export const updateAnimalDetailsQuery = (
    input: AnimalDetailsInput
): QueryConfig =>
    update(table, snakeCaseKeys(input))
        .where({ animal_id: input.animalId })
        .returning(returnFields)
        .toParams();

export const deleteAnimalDetailsQuery = (id: number): QueryConfig => {
    const text = `DELETE
                FROM ${table}
                WHERE animal_id = $1
                RETURNING
                    animal_id,
                    breed_id,
                    gender_id,
                    color_id,
                    birth_date,
                    weight,
                    allergy,
                    food;`;

    const query = {
        text,
        values: [id],
    };

    return query;
};
