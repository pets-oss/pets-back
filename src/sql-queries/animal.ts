import { QueryConfig } from 'pg';
import { gt, in as $in, insert, lt, select, update, isNotNull } from 'sql-bricks-postgres';
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

export const getAnimalQuery = (userId: string, id: number): QueryConfig => {
    const text = `
        SELECT
            id,
            name,
            organization,
            status,
            image_url,
            comments,
            ${table}.mod_time,
            af.animal_id IS NOT NULL AS is_favorite
        FROM ${table}
        LEFT JOIN (SELECT * FROM animal_favorite WHERE user_id = $2) AS af
            ON ${table}.id = af.animal_id
        WHERE id = $1;
    `;

    const query = {
        text,
        values: [
            id,
            userId
        ],
    };

    return query;
};

export const getAnimalsQuery = (
    userId: string,
    ids?: [number] | null,
    species?: [number] | null,
    gender?: [number] | null,
    breed?: [number] | null,
    isFavoriteOnly?: boolean,
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
        a.mod_time,
        af.animal_id IS NOT NULL AS is_favorite`)
        .from(`${table} AS a`);
    query = species || gender || breed ?
        query.leftJoin('animal_details AS ad').on('a.id', 'ad.animal_id')
        : query;
    query = species ?
        query.leftJoin('breed AS b').on('ad.breed_id', 'b.id')
        : query;
    query = ids ? query.where($in('a.id', ids)) : query;
    query = species ? query.where($in('b.species', species.map(String))) : query;
    query = gender ? query.where($in('ad.gender_id', gender.map(String))) : query;
    query = breed ? query.where($in('ad.breed_id', breed.map(String))) : query;
    query = query.leftJoin(
        `(${select().from('animal_favorite').where('user_id', userId)}) AS af`
    )
        .on('a.id', 'af.animal_id');
    query = isFavoriteOnly ? query.where(isNotNull('af.animal_id')) : query;

    const selected = 'selected'
    let pagination = select().from(`${selected} AS s`);
    pagination = cursor ? pagination.where(reverse ? lt('s.id', cursor) : gt('s.id', cursor)) : pagination;
    pagination = reverse ? pagination.orderBy('s.id DESC') : pagination.orderBy('s.id');
    pagination = limit != null ? pagination.limit(limit) : pagination;
    pagination = pagination.crossJoin('total_count');

    return {
        text: `WITH ${selected} AS (${query.toString()}),
            total_count AS (SELECT COUNT(*) AS total_count FROM ${selected})
            ${pagination.toString()}`,
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
