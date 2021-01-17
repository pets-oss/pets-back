import { QueryConfig } from 'pg';

export const getBreedsQuery = (language: string): QueryConfig => {
    const text = `
        SELECT 
            id,
            code,
            language,
            translation as value,
            species
        FROM breed b
        LEFT JOIN breed_translation bt ON bt.breed = b.id
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
