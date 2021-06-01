import { QueryConfig } from 'pg';

const table = 'app_user';
const returnFields = 'id, name, surname';

// eslint-disable-next-line import/prefer-default-export
export const getAppUserQuery = (id: string): QueryConfig => {
    const text = `SELECT ${returnFields} FROM public.${table}
                WHERE id = $1;`;

    return {
        text,
        values: [id]
    };
};
