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

    let query = select(`
        a.id,
        a.name,
        a.organization,
        a.status,
        a.image_url,
        a.comments,
        a.mod_time`)
        .from(`${table} as a`);
    query = species || gender || breed ?
        query.leftJoin('animal_details AS ad').on('a.id', 'ad.animal_id')
        : query;
    query = species ?
        query.leftJoin('breed AS b').on('ad.breed_id', 'b.id')
        : query;
    query = ids ? query.where($in('a.id', ids)) : query;
    query = species ? query.where($in('b.species', species)) : query;
    query = gender ? query.where($in('ad.gender_id', gender)) : query;
    query = breed ? query.where($in('ad.breed_id', breed)) : query;
    const queryParams = query.toParams();

    const selected = 'selected'
    let pagination = select().from('selected as s');
    pagination = cursor ? pagination.where(reverse ? lt('s.id', cursor) : gt('s.id', cursor)) : pagination;
    pagination = reverse ? pagination.orderBy('s.id DESC') : pagination.orderBy('s.id');
    pagination = limit != null ? pagination.limit(limit) : pagination;
    pagination = pagination.crossJoin('total_count');
    const paginationParams = pagination.toParams();

    return {
        text: `WITH ${selected} as (${queryParams.text}),
            total_count as (SELECT COUNT(*) as total_count FROM ${selected})
            ${paginationParams.text}`,
        values: [...queryParams.values, ...paginationParams.values]
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
