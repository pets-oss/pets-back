import { QueryConfig } from 'pg';

// eslint-disable-next-line import/prefer-default-export
export const getChipCompaniesQuery = (language: string): QueryConfig => {
    const text = `
        SELECT
            chip_company_code AS id,
            translation AS value
        FROM chip_company_translation
        WHERE language = $1;
    `;

    return {
        text,
        values: [language],
    };
};
