import { QueryConfig } from 'pg';
import { select } from 'sql-bricks-postgres';

export const getColorsQuery = (
    language: string,
    speciesId?: number
): QueryConfig => {

    let colorQuery = select().from('color');
    colorQuery = speciesId ? colorQuery.where('species', speciesId) : colorQuery;
    const colorQueryParams = colorQuery.toParams();

    const query = select(`c.code as id,
    ct.translation as value,
    c.species as species_id,
    st.translation as species_name`)
        .from(`(${colorQueryParams.text}) AS c`)
        .leftJoin(`(${select().from('color_translation').where('language', language)}) AS ct`)
        .on('c.code', 'ct.color')
        .leftJoin(`(${select().from('species_translation').where('language', language)}) AS st`)
        .on('c.species', 'st.species')

    return {
        text: query.toParams().text,
        values: colorQueryParams.values
    };
};

export const getColorQuery = (
    color_id: string,
    language: string,
    defaultLanguage: string
): QueryConfig => {
    const text = `
        SELECT color AS id, translation AS value
        FROM color_translation
        WHERE color = $1
            AND language IN ($2, $3)
        ORDER BY language = $2 DESC
        LIMIT 1;
    `;

    return {
        text,
        values: [color_id, language, defaultLanguage],
    };
};
