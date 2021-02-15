import { QueryConfig } from 'pg';

export const getGendersQuery = (language: string): QueryConfig => {
    const text = `
        SELECT 
            gender as id, 
            translation as value
        FROM gender_translation
        WHERE language = $1;
    `;

    return {
        text,
        values: [ language ]
    };
};

export const getGenderQuery = (gender_id: string, language: string, defaultLanguage: string): QueryConfig => {
    const text = `
        SELECT gender AS id, translation AS value 
        FROM gender_translation 
        WHERE gender = $1 
            AND language IN ($2, $3) 
        ORDER BY language = $2 DESC
        LIMIT 1`;

    return {
        text,
        values: [ gender_id, language, defaultLanguage ]
    }
};
