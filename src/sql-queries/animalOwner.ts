import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

const table = 'animal_owner';

interface CreateAnimalOwnerInput {
    name: string
    surname?: string | null
    phone?: string | null
}

interface UpdateAnimalOwnerInput {
    id: number
    name?: string | null
    surname?: string | null
    phone?: string | null
}

export const getAnimalOwnersQuery = (): QueryConfig => {
    const text = `SELECT * FROM ${table}`;

    return {
        text
    };
};

export const getAnimalOwnerQuery = (id: number): QueryConfig => {
    const text = `SELECT * FROM ${table} WHERE id = $1`;

    return {
        text,
        values: [id]
    };
};

export const createAnimalOwnerQuery =
    (input: CreateAnimalOwnerInput): QueryConfig =>
        insert(table, snakeCaseKeys(input))
            .returning('*')
            .toParams();

export const updateAnimalOwnerQuery =
    (input: UpdateAnimalOwnerInput): QueryConfig =>
        update(table, snakeCaseKeys(input))
            .where({ id: input.id })
            .returning('*')
            .toParams();
