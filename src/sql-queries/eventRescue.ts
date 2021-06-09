import { QueryConfig } from 'pg';
import { insert } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'event_rescue';
const returningFields = 'id, street, house_no, municipality_id, date_time AS date, animal_id, comments, author';

export const getRescueEventsQuery = (): QueryConfig => {
    const text = `
        SELECT id,
               street,
               house_no,
               municipality_id,
               date_time AS date,
               animal_id,
               comments,
               author
        FROM event_rescue;`;

    return {
        text
    };
};

interface CreateRescueEventInput {
    street: String
    houseNo: String
    municipalityId: number
    date: String
    animalId: number
    comments: String
    author: String
}

function dateToDateTime(input: CreateRescueEventInput) {
    const { date, ...otherFields } = input;
    return { dateTime: date, ...otherFields };
}

export const createRescueEventQuery =
    (input: CreateRescueEventInput): QueryConfig =>
        insert(table, snakeCaseKeys(dateToDateTime(input)))
            .returning(returningFields).toParams();
