import { QueryConfig } from 'pg';

const getStatusesQuery = (language: string): QueryConfig => {
    const text = `SELECT 
                    status as id, 
                    translation as value
                FROM status_translation
                WHERE language = $1;`;

    const query = {
        text,
        values: [language],
    };

    return query;
};

export default getStatusesQuery;
