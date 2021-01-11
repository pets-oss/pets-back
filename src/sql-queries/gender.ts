import { QueryConfig } from 'pg';

const getGendersQuery = (language: string): QueryConfig => {
    const text = `SELECT 
                    gender as id, 
                    translation as value
                FROM gender_translation
                WHERE gender = ANY(enum_range(null::gender))
                AND language = $1;`;

    const query = {
        text,
        values: [language],
    };

    return query;
};

export default getGendersQuery;
