import { QueryConfig } from 'pg';
import { select } from 'sql-bricks-postgres';

export const getBreedsQuery = (
    species: string | null | undefined,
    language: string
): QueryConfig => {

    let filteredBreedsQuery = select().from('breed');
    filteredBreedsQuery = species ? filteredBreedsQuery.where({ species })
        : filteredBreedsQuery;

    const query = select(`
        b.id,
        b.abbreviation,
        bt.translation as value,
        b.species as species_id,
        st.translation as species_value`)
        .from(`(${filteredBreedsQuery}) as b`)
        .leftJoin(`(${select().from('breed_translation').where({ language })}) AS bt`)
        .on('b.id', 'bt.breed')
        .leftJoin(`(${select().from('species_translation').where({ language })}) AS st`)
        .on('b.species', 'st.species');

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
        values: [breed_id, language, defaultLanguage]
    };
};
