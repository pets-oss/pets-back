import { QueryConfig } from 'pg';

export const getStreetfindEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'Registration' AS group, 'Streetfind' AS type
        FROM event_streetfind
        WHERE ($1::int IS NULL OR animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    };
};

export const getGiveawayEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'Registration' AS group, 'Giveaway' AS type
        FROM event_giveaway
        LEFT JOIN animal_owner ON animal_owner.id = event_giveaway.former_owner_id
        WHERE ($1::int IS NULL OR event_giveaway.animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    };
};

export const getMedicationEvents = (animalId: number | null): QueryConfig => {
    const table = 'event_medication';
    const group = 'Medical';
    const type = 'Medication';

    const text = `
        SELECT *, '${group}' AS group, '${type}' AS type
        FROM ${table}
        WHERE ($1::int IS NULL OR ${table}.animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    };
};

export const getSurgeryEvents = (animalId: number | null): QueryConfig => {
    const table = 'event_surgery';
    const group = 'Medical';
    const type = 'Surgery';

    const text = `
        SELECT *, '${group}' AS group, '${type}' AS type
        FROM ${table}
        WHERE ($1::int IS NULL OR ${table}.animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    };
};

export const getDeathEvents = (animalId: number | null): QueryConfig => {
    const table = 'event_death';
    const group = 'Medical';
    const type = 'Death';

    const text = `
        SELECT *, '${group}' AS group, '${type}' AS type
        FROM ${table}
        WHERE ($1::int IS NULL OR ${table}.animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    };
};

export const getEventTypeTranslationQuery =
(
    eventType: string,
    language: string,
    defaultLanguage: string
): QueryConfig => {
    const text = `
        SELECT
            event_type AS id,
            translation AS value
        FROM event_type_translation
        WHERE event_type = $1 AND language IN ($2, $3)
        LIMIT 1;
    `;

    return {
        text,
        values: [ eventType, language, defaultLanguage ]
    };
};

export const getEventGroupTranslationQuery =
(
    eventGroup: string,
    language: string,
    defaultLanguage: string
): QueryConfig => {
    const text = `
        SELECT
            event_group AS id,
            translation AS value
        FROM event_group_translation
        WHERE event_group = $1 AND language IN ($2, $3)
        LIMIT 1;
    `;

    return {
        text,
        values: [ eventGroup, language, defaultLanguage ]
    };
};
