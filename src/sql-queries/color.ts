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

export const getColorQuery = (color_id: string, language: string, defaultLanguage: string): QueryConfig => {
    const text = `
        SELECT color AS id, translation AS value 
        FROM color_translation 
        WHERE color = $1 
            AND language IN ($2, $3)
        ORDER BY language = $2 DESC
        LIMIT 1;
    `;

    return {
        text,
        values: [ color_id, language, defaultLanguage ]
    }
};
