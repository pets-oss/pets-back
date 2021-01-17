import { QueryConfig } from 'pg';

export const getColorsQuery = (language: string): QueryConfig => {
    const text = `
        SELECT 
            color as id, 
            translation as value
        FROM color_translation
        WHERE language = $1;
    `;

    return {
        text,
        values: [ language ]
    };
};

export const getColorQuery = (color_id: string, language: string): QueryConfig => {
    const text = `
        SELECT translation AS color 
        FROM color_translation 
        WHERE color = $1 
            AND language = $2
    `;

    return {
        text,
        values: [ color_id, language ]
    }
};
