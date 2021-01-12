import { QueryConfig } from 'pg';

export const getAnimalRegistrationsQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    registration_no,
                    registration_date,
                    status
                FROM public.animal_registration
                WHERE animal_id = $1;`;

    const query = {
        text,
        values: [id],
    };

    return query;
};

export const getAnimalsRegistrationsQuery = (): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    registration_no,
                    registration_date,
                    status
                FROM public.animal_registration;`;

    const query = {
        text,
    };

    return query;
};

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
