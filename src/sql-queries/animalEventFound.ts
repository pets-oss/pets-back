import { QueryConfig } from 'pg';
import { insert } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'animal_event_found';
const returningFields = 'id, street, house_no, municipality_id, date_time AS date, animal_id, comments';

export const getAnimalFoundEventsQuery = (): QueryConfig => {
    const text = `
        SELECT id,
               street,
               house_no,
               municipality_id,
               date_time AS date,
               animal_id,
               comments
        FROM animal_event_found;`;

    return {
        text
    };
};

interface CreateAnimalFoundEventInput {
    street: String
    houseNo: String
    municipalityId: number
    date: String
    animalId: number
    comments: String
}

function dateToDateTime(input: CreateAnimalFoundEventInput) {
    const {date, ...otherFields} = input;
    return { dateTime: date, ...otherFields };
}

export const createAnimalFoundEventQuery =
    (input: CreateAnimalFoundEventInput): QueryConfig =>
        insert(table, snakeCaseKeys(dateToDateTime(input)))
            .returning(returningFields).toParams();

