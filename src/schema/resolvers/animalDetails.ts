import { IResolvers } from 'graphql-tools';
import { getGenderQuery } from '../../sql-queries/gender';
import { getBreedQuery } from '../../sql-queries/breed';
import { getSpeciesByBreedIdQuery } from '../../sql-queries/species';
import { getColorQuery } from '../../sql-queries/color';
import {deleteAnimalDetailsQuery} from "../../sql-queries/animalDetails";

const defaultLanguage: string = 'lt';

const resolvers: IResolvers = {
    AnimalDetails: {
        gender: async ({ gender_id } , { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getGenderQuery(gender_id, language, defaultLanguage));

            return dbResponse.rows[0];
        },
        breed: async ({ breed_id }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getBreedQuery(breed_id, language, defaultLanguage));

            return dbResponse.rows[0];
        },
        species: async ({ breed_id }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getSpeciesByBreedIdQuery(breed_id, language, defaultLanguage));

            return dbResponse.rows[0];
        },
        color: async ({ color_id }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getColorQuery(color_id, language, defaultLanguage));

            return dbResponse.rows[0];
        }
    },
    Mutation: {
        deleteAnimalDetails: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(deleteAnimalDetailsQuery(id));
            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
