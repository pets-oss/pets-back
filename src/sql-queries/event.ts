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

export const getRescueEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'General' AS group, 'Rescue' AS type
        FROM event_rescue
        WHERE ($1::int IS NULL OR animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    }
}

export const getHandOverEventsQuery = (animalId: number | null): QueryConfig => {
    const text = `
        SELECT *, 'General' AS group, 'HandOver' AS type
        FROM event_hand_over
        LEFT JOIN animal_owner ON animal_owner.id = event_hand_over.former_owner_id
        WHERE ($1::int IS NULL OR event_hand_over.animal_id = $1)
    `;

    return {
        text,
        values: [ animalId ]
    }
}
