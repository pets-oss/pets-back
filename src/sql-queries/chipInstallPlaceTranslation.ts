import { QueryConfig } from 'pg';

const getChipInstallPlacesTranslationQuery = (
    language: string
): QueryConfig => {
    const text = `
        SELECT
            install_place_id AS id,
            translation AS value
        FROM chip_install_place_translation
        WHERE language = $1;
    `;

    return {
        text,
        values: [language],
    };
};

export default getChipInstallPlacesTranslationQuery;
