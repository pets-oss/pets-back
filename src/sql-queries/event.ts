import { QueryConfig } from 'pg';

export const getGeneralEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'General' AS category, 'General' AS group
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
        SELECT *, 'Medical' AS category, 'Medical' AS group
        FROM animal_event_medical_record
        WHERE ($1::int IS NULL OR animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    }
}

export const getFoundEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'Found' AS category, 'General' AS group, 'Rescued' AS type
        FROM animal_event_found
        WHERE ($1::int IS NULL OR animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    }
}

export const getGivenAwayEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'GivenAway' AS category, 'General' AS group, 'GivenAway' AS type
        FROM animal_event_given_away
        WHERE ($1::int IS NULL OR animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    }
}

