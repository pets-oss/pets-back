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
