import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'event_hand_over';
const returnFields = 'id, former_owner_id, date_time as date, animal_id, reason, author';
const dateToDateTime =
    (input: CreateHandOverEventInput | UpdateHandOverEventInput) => {
        const { date, ...inputWithoutDate } = input;
        return { ...inputWithoutDate, dateTime: date };
    };

interface CreateHandOverEventInput {
    formerOwnerId: number
    date: string
    animalId: number
    reason: string
    author: string
}

interface UpdateHandOverEventInput {
    id: number
    formerOwnerId: number
    date: string
    animalId: number
    reason: string
    author: string
}

export const createHandOverEventQuery = (
    input: CreateHandOverEventInput
): QueryConfig => insert(table, snakeCaseKeys(dateToDateTime(input)))
    .returning(returnFields)
    .toParams();

export const updateHandOverEventQuery = (
    input: UpdateHandOverEventInput
): QueryConfig => update(table, snakeCaseKeys(dateToDateTime(input)))
    .where({ id: input.id })
    .returning(returnFields)
    .toParams();
