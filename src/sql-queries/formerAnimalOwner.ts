import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'former_animal_owner';
const returnFields = '*';

interface CreateFormerAnimalOwnerInput {
    name: string
    surname: string | null
    phone: string | null
}

interface UpdateFormerAnimalOwnerInput {
    id: number
    name: string
    surname: string | null
    phone: string | null
}

export const getFormerAnimalOwnersQuery = (): QueryConfig => {
    const text = `SELECT ${returnFields} FROM ${table}`;

    return {
        text
    };
};

export const getFormerAnimalOwnerQuery = (id: number): QueryConfig => {
    const text = `SELECT ${returnFields} FROM ${table} WHERE id = $1`;

    return {
        text,
        values: [id]
    };
};

export const createFormerAnimalOwnerQuery =
    (input: CreateFormerAnimalOwnerInput): QueryConfig =>
        insert(table, snakeCaseKeys(input))
            .returning(returnFields)
            .toParams();

export const updateFormerAnimalOwnerQuery =
    (input: UpdateFormerAnimalOwnerInput): QueryConfig =>
        update(table, snakeCaseKeys(input))
            .where({ id: input.id })
            .returning(returnFields)
            .toParams();
