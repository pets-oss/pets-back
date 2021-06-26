import { QueryConfig } from 'pg';
import { insert } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'event_streetfind';
const returningFields = 'id, street, house_no, municipality_id, date_time AS date, animal_id, comments, author';

export const getStreetfindEventsQuery = (): QueryConfig => {
    const text = `
        SELECT id,
               street,
               house_no,
               municipality_id,
               date_time AS date,
               animal_id,
               comments,
               author
        FROM event_streetfind;`;

    return {
        text
    };
};

interface CreateStreetfindEventInput {
    street: String
    houseNo: String
    municipalityId: number
    date: String
    animalId: number
    comments: String
    author: String
}

function dateToDateTime(input: CreateStreetfindEventInput) {
    const { date, ...otherFields } = input;
    return { dateTime: date, ...otherFields };
}

export const createStreetfindEventQuery =
    (input: CreateStreetfindEventInput): QueryConfig =>
        insert(table, snakeCaseKeys(dateToDateTime(input)))
            .returning(returningFields).toParams();
