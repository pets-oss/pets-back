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

export const getFoundEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'General' AS group, 'Found' AS type
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
        SELECT *, 'General' AS group, 'GivenAway' AS type
        FROM animal_event_given_away
        LEFT JOIN former_animal_owner ON former_animal_owner.id = animal_event_given_away.former_owner_id
        WHERE ($1::int IS NULL OR animal_event_given_away.animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    }
}

