import { QueryConfig } from 'pg';

const getGendersQuery = (language: string): QueryConfig => {
    const text = `SELECT 
                    gender as id, 
                    translation as value
                FROM gender_translation
                WHERE language = $1
                ORDER BY id;`;

    const query = {
        text,
        values: [language],
    };

    return query;
};

export default getGendersQuery;
