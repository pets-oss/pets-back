import { QueryConfig } from 'pg';

const getActiveAnimalRegistrationQuery = (id: number): QueryConfig => {
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

export default getActiveAnimalRegistrationQuery;
