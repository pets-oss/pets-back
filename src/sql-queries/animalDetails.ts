import { QueryConfig } from 'pg';

export const getAnimalDetailsQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    breed_id,
                    name,
                    gender,
                    color,
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

export const getAnimalsDetailsQuery = (): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    breed_id,
                    name,
                    gender,
                    color,
                    birth_date,
                    weight,
                    allergy,
                    food
                FROM public.animal_details;`;

    const query = {
        text,
    };

    return query;
};
