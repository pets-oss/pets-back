import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'event_medication';
const returnFields = 'id, treatment, expenses, date_time, animal_id, author, comments';
export interface CreateMedicationEventData {
    animalId: number
    dateTime?: string | null
    comments?: string | null
    treatment: string
    expenses?: string | null
    author: string
}

export interface UpdateMedicationEventData {
    id: number
    animalId?: number
    dateTime?: string | null
    comments?: string | null
    treatment?: string
    expenses?: number | null
    author?: string
}

export const createMedicationEventQuery = (
    data: CreateMedicationEventData
): QueryConfig => insert(table, snakeCaseKeys(data))
    .returning(returnFields)
    .toParams();

export const updateMedicationEventQuery = (
    data: UpdateMedicationEventData
): QueryConfig => update(table, snakeCaseKeys(data))
    .where({ id: data.id })
    .returning(returnFields)
    .toParams();
