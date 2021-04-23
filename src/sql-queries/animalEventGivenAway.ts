import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'animal_event_given_away';
const returnFields = 'id, former_owner_id, date_time as date, animal_id, reason';
const dateToDateTime = (input: CreateGivenAwayEventInput) => {
    const { date, ...inputWithoutDate } = input;
    return { ...inputWithoutDate, dateTime: date };
};

interface CreateGivenAwayEventInput {
    formerOwnerId: number
    date: String
    animalId: number
    reason: String
}

interface UpdateGivenAwayEventInput {
    id: number
    formerOwnerId: number
    date: String
    animalId: number
    reason: String
}

export const createGivenAwayEventQuery = (
    input: CreateGivenAwayEventInput
): QueryConfig =>
    insert(table, snakeCaseKeys(dateToDateTime(input)))
        .returning(returnFields)
        .toParams();


export const updateGivenAwayEventQuery = (
    input: UpdateGivenAwayEventInput
): QueryConfig =>
    update(table, snakeCaseKeys(dateToDateTime(input)))
        .where({ id: input.id })
        .returning(returnFields)
        .toParams();
