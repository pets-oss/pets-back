import { QueryConfig } from 'pg';
import { gt, in as $in, insert, lt, select, update } from 'sql-bricks-postgres';
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

export const getAnimalsQuery = (
    ids?: [number] | null,
    species?: [number] | null,
    gender?: [number] | null,
    breed?: [number] | null,
    limit?: number | null,
    reverse?: boolean | null,
    cursor?: string | null,
): QueryConfig => {


    let subQuery = select(`
        a.id,
        a.name,
        a.organization,
        a.status,
        a.image_url,
        a.comments,
        a.mod_time`)
        .from(`${table} as a`)
        .leftJoin('animal_details AS ad').on('a.id', 'ad.animal_id')
        .leftJoin('breed AS b').on('ad.breed_id', 'b.id');

    subQuery = ids ? subQuery.where($in('a.id', ids)) : subQuery;
    subQuery = species ? subQuery.where($in('b.species', species)) : subQuery;
    subQuery = gender ? subQuery.where($in('ad.gender_id', gender)) : subQuery;
    subQuery = breed ? subQuery.where($in('ad.breed_id', breed)) : subQuery;

    const baseQuery =
        `WITH
            selected as (${subQuery.toString()}),
            total_count as (SELECT COUNT(*) as total_count FROM selected)`;

    let pagination = select().from('selected');
    pagination = cursor ? pagination.where(reverse ? lt('selected.id', cursor) : gt('selected.id', cursor)) : pagination;
    pagination = reverse ? pagination.orderBy('selected.id DESC') : pagination.orderBy('selected.id');
    pagination = limit != null ? pagination.limit(limit) : pagination;
    pagination = pagination.crossJoin('total_count');

    return {
        text: `${baseQuery}${pagination.toString()}`
    };
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
