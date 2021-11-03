import { QueryConfig } from 'pg';
import { select } from 'sql-bricks-postgres';

export const getBreedsQuery = (
    species: string | null | undefined,
    language: string
): QueryConfig => {

    let query = select(`
        id,
        abbreviation,
         translation as value`)
        .from('breed b')
        .leftJoin(`(${select().from('breed_translation').where('language', language)}) AS bt`)
        .on('b.id', 'bt.breed');

    query = species ? query.where({species}) : query;

    return query.toParams();
};

export const getBreedQuery = (
    breed_id: string,
    language: string,
    defaultLanguage: string
): QueryConfig => {
    const text = `
        SELECT b.id, b.abbreviation, bt.translation as value
        FROM breed b
        LEFT JOIN breed_translation bt ON bt.breed = b.id
        WHERE bt.breed = $1
            AND bt.language IN ($2, $3)
        ORDER BY bt.language = $2 DESC
        LIMIT 1;
    `;

    return {
        text,
        values: [ breed_id, language, defaultLanguage ]
    }
};
