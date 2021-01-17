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

export const getGenderQuery = (gender_id: string, language: string): QueryConfig => {
    const text = `
        SELECT translation AS gender 
        FROM gender_translation 
        WHERE gender = $1 
            AND language = $2
    `;

    return {
        text,
        values: [ gender_id, language ]
    }
};
