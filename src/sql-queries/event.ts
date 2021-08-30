import { QueryConfig } from 'pg';

export const getGeneralEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'General' AS group
        FROM animal_event_general
        WHERE ($1::int IS NULL OR animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    }
}

export const getMedicalEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'Medical' AS group
        FROM animal_event_medical_record
        WHERE ($1::int IS NULL OR animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    }
}

export const getStreetfindEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'Registration' AS group, 'Streetfind' AS type
        FROM event_streetfind
        WHERE ($1::int IS NULL OR animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    }
}

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
    }
}

export const getLocationChangeEvents = (animalId: number | null): QueryConfig => {
    const table = 'event_location_change';
    const group = 'General';
    const type = 'LocationChange';

    const text = `
        SELECT *, '${group}' AS group, '${type}' AS type
        FROM ${table}
        WHERE ($1::int IS NULL OR ${table}.animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    }
}

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
    }
}

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
    }
}
