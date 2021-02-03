import { IResolvers } from 'graphql-tools';
import { getGenderQuery } from '../../sql-queries/gender';
import { getBreedQuery } from '../../sql-queries/breed';
import { getSpeciesByBreedIdQuery } from '../../sql-queries/species';
import { getColorQuery } from '../../sql-queries/color';

const defaultLanguage: string = 'lt';

const resolvers: IResolvers = {
    AnimalDetails: {
        gender: async ({ gender } , { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getGenderQuery(gender, language, defaultLanguage));

            return dbResponse.rows[0].gender;
        },
        breed: async ({ breed_id }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getBreedQuery(breed_id, language, defaultLanguage));

            return dbResponse.rows[0].breed;
        },
        species: async ({ breed_id }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getSpeciesByBreedIdQuery(breed_id, language, defaultLanguage));

            return dbResponse.rows[0].species;
        },
        color: async ({ color }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getColorQuery(color, language, defaultLanguage));

            return dbResponse.rows[0].color;
        }
    }
};

export default resolvers;
