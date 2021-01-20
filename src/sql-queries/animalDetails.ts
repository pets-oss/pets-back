import { QueryConfig } from 'pg';

const getAnimalDetailsQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    breed_id,
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

export default getAnimalDetailsQuery;
