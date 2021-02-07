import { QueryConfig } from 'pg';

export const getStatusesQuery = (language: string): QueryConfig => {
    const text = `SELECT 
                    status as id, 
                    translation as value
                FROM status_translation
                WHERE language = $1;`;

    const query = {
        text,
        values: [language],
    };

    return query;
};

export const getStatusTranslationQuery = (status: string, language: string, defaultLanguage: string): QueryConfig => {
    const text = `
        SELECT translation AS status
        FROM status_translation
        WHERE status = $1
            AND language IN ($2, $3)
        ORDER BY language = $2 DESC
        LIMIT 1;
    `;

    const query = {
        text,
        values: [status, language, defaultLanguage],
    };

    return query;
};
