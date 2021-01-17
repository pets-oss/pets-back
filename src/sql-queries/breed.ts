import { QueryConfig } from 'pg';

export const getBreedsQuery = (language: string): QueryConfig => {
    const text = `
        SELECT 
            breed as id,
            translation as value
        FROM breed_translation
        WHERE language = $1;
    `;

    return {
        text,
        values: [ language ]
    };
};

export const getBreedQuery = (breed_id: string, language: string): QueryConfig => {
    const text = `
        SELECT translation AS breed 
        FROM breed_translation 
        WHERE breed = $1 
            AND language = $2
    `;

    return {
        text,
        values: [ breed_id, language ]
    }
};
