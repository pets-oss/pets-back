import { QueryConfig } from 'pg';
import { update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'animal_event_found';
const returnFields =
    'id, street, house_no, municipality_id, date_time AS date, animal_id, comments';

interface UpdateAnimalEventFoundInput {
    id: number;
    street: String;
    houseNo?: String;
    municipalityId: number;
    date: Date;
    animalId: number;
    comments: String;
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

export const updateAnimalEventFound = (
    input: UpdateAnimalEventFoundInput
): QueryConfig => {
    const { date, ...inputData } = input;
    const dateTime = date;
    const data = { ...inputData, dateTime };

    return update(table, snakeCaseKeys(data))
        .returning(returnFields)
        .where({ id: data.id })
        .toParams();
};
