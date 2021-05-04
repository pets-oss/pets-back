import { QueryConfig } from 'pg';

export const getAnimalFoundEventsQuery = (): QueryConfig => {
    const text = `
        SELECT
            id,
            street,
            house_no,
            municipality_id,
            date_time AS date,
            animal_id,
            comments
        FROM animal_event_found;`;

    return {
        text,
    };
};

interface CreateAnimalFoundEventInput {
    street: String;
    houseNo?: String;
    municipalityId: number;
    date: Date;
    animalId: number;
    comments: String;
}

export const createAnimalEventFound = (
    input: CreateAnimalFoundEventInput
): QueryConfig => {
    const text = `
    INSERT
    INTO animal_event_found
    (
        street,
        house_no,
        municipality_id,
        date_time,
        animal_id,
        comments 
    )
    VALUES
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
    )
    RETURNING 
        id,
        street,
        house_no,
        municipality_id,
        date_time AS date,
        animal_id,
        comments 
    `;

    return {
        text,
        values: [
            input.street,
            input.houseNo,
            input.municipalityId,
            input.date,
            input.animalId,
            input.comments,
        ],
    };
};
