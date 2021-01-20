import { QueryConfig } from 'pg';

export const getBreedsQuery = (species: string, language: string): QueryConfig => {
    const text = `
        SELECT 
            id,
            abbreviation,
            language,
            translation as value
        FROM breed b
        LEFT JOIN (SELECT * FROM breed_translation WHERE language = $2) bt 
            ON bt.breed = b.id
        WHERE species = $1;
    `;

    return {
        text,
        values: [ species, language ]
    };
};

export const getBreedQuery = (breed_id: string, language: string, defaultLanguage: string): QueryConfig => {
    const text = `
        SELECT translation AS breed 
        FROM breed_translation 
        WHERE breed = $1 
            AND language IN ($2, $3)
        ORDER BY language = $2 DESC
        LIMIT 1;
    `;

    return {
        text,
        values: [ breed_id, language, defaultLanguage ]
    }
};
