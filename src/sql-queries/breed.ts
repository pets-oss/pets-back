import { QueryConfig } from 'pg';

const getBreedsQuery = (language: string, species: string): QueryConfig => {
    const text = `SELECT b.id, b.code, bt.translation as value
                    FROM breed b JOIN breed_translation bt 
                      ON b.id = bt.breed
                   WHERE bt.language = $1
                     AND b.species = $2;`;

    const query = {
        text,
        values: [language, species],
    };

    return query;
};

export default getBreedsQuery;
