import { QueryConfig } from 'pg';
import { in as $in, insert, gt, lt, gte, lte, select, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';
import { AnimalRegistrationInput } from './animalRegistration';
import { AnimalDetailsInput } from './animalDetails';
import { AnimalMicrochipInput } from './animalMicrochip';

const table = 'animal';
const returnFields =
    'id, name, organization, status, image_url, comments, mod_time';

interface CreateAnimalInput {
    name: String;
    organization: number;
    status: String;
    image_url: String;
    comments: String;
    registration: AnimalRegistrationInput;
    details: AnimalDetailsInput;
    microchip: AnimalMicrochipInput;
}

interface UpdateAnimalInput {
    id: number;
    name: String;
    organization: number;
    status: String;
    image_url: String;
    comments: String;
    registration: AnimalRegistrationInput;
    details: AnimalDetailsInput;
    microchip: AnimalMicrochipInput;
}

interface DeleteAnimalInput {
    id: number;
}

export const getAnimalQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    id,
                    name,
                    organization,
                    status,
                    image_url,
                    comments,
                    mod_time
                FROM ${table}
                WHERE id = $1;`;

    const query = {
        text,
        values: [id],
    };

    return query;
};

interface AnimalsQueryInput {
    ids?: [number] | null,
    limit?: number | null,
    reverse?: boolean | null,
    offset?: string | null,
}

export const getAnimalsHasPreviousQuery =
    (offset: string, reverse: boolean = false): QueryConfig =>
        select('CASE WHEN COUNT(*) > 0 THEN true ELSE false END as has_previous_page')
            .from(table)
            .where(reverse ? gte('id', offset) : lte('id', offset))
            .toParams();

export const getAnimalsQuery =
    ({ ids, reverse, limit, offset }: AnimalsQueryInput): QueryConfig => {
        let query = select(returnFields).from(table);
        query = ids ? query.where($in('id', ids)) : query;
        query = offset ? query.where(reverse? lt('id', offset): gt('id', offset)) : query;
        query = reverse ? query.orderBy('id DESC') : query;
        query = limit ? query.limit(limit) : query;

        return query.toParams();
    };

export const createAnimalQuery = (input: CreateAnimalInput): QueryConfig => {
    const { registration, details, microchip, ...animal } = input;
    return insert(table, snakeCaseKeys(animal))
        .returning(returnFields)
        .toParams();
};

export const updateAnimalQuery = (input: UpdateAnimalInput): QueryConfig => {
    const { registration, details, microchip, ...animal } = input;
    return update(table, snakeCaseKeys(animal))
        .where({ id: input.id })
        .returning(returnFields)
        .toParams();
};

export const deleteAnimalQuery = (input: DeleteAnimalInput): QueryConfig => {
    const text = `DELETE FROM ${table}
                  WHERE id = $1
                  RETURNING
                  ${returnFields};`;

    const query = {
        text,
        values: [input.id],
    };

    return query;
};
