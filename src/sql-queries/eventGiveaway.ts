import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'event_giveaway';
const returnFields = 'id, registration_date, registration_no, former_owner_id, date_time as date, animal_id, reason, author';
const dateToDateTime =
    (input: CreateGiveawayEventInput | UpdateGiveawayEventInput) => {
        const { date, ...inputWithoutDate } = input;
        return { ...inputWithoutDate, dateTime: date };
    };

interface CreateGiveawayEventInput {
    registrationDate: string
    registrationNo: string
    formerOwnerId: number
    date: string
    animalId: number
    reason: string
    author: string
}

interface UpdateGiveawayEventInput {
    id: number
    registrationDate: string
    registrationNo: string
    formerOwnerId: number
    date: string
    animalId: number
    reason: string
    author: string
}

export const createGiveawayEventQuery = (
    input: CreateGiveawayEventInput
): QueryConfig => insert(table, snakeCaseKeys(dateToDateTime(input)))
    .returning(returnFields)
    .toParams();

export const updateGiveawayEventQuery = (
    input: UpdateGiveawayEventInput
): QueryConfig => update(table, snakeCaseKeys(dateToDateTime(input)))
    .where({ id: input.id })
    .returning(returnFields)
    .toParams();
