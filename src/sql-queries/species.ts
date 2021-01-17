import { QueryConfig } from 'pg';

export const getSpeciesQuery = (language: string): QueryConfig => {
    const text = `
        SELECT 
            species as id, 
            translation as value
        FROM species_translation
        WHERE language = $1;
    `;

    return {
        text,
        values: [ language ]
    };
};

export const getSpeciesByBreedIdQuery = (breed_id: number, language: string): QueryConfig => {
    const text = `
        SELECT translation AS species
        FROM species_translation 
        WHERE species = (SELECT species FROM breed WHERE id = $1) 
            AND language = $2
    `;

    return {
        text,
        values: [ breed_id, language ]
    }
};
