import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'animal_event_found';
const returnFields =
    'id, street, house_no, municipality_id, date_time AS date, animal_id, comments';

interface CreateAnimalEventFoundInput {
    street: string;
    houseNo?: string;
    municipalityId: number;
    date: Date;
    animalId: number;
    comments: string;
}

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

export const createAnimalEventFound = (
    input: CreateAnimalEventFoundInput
): QueryConfig => {
    let { date, ...inputData } = input;
    let dateTime = date;
    let data = { ...inputData, dateTime };

    return insert(table, snakeCaseKeys(data))
        .returning(returnFields)
        .toParams();
};
