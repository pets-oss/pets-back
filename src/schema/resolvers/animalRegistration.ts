import { IResolvers } from 'graphql-tools';
import {
    getActiveAnimalRegistrationQuery,
    deleteAnimalRegistrationQuery,
} from '../../sql-queries/animalRegistration';
import { getStatusTranslationQuery } from '../../sql-queries/status';

const defaultLanguage: string = 'lt';

const resolvers: IResolvers = {
    Query: {
        registration: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getActiveAnimalRegistrationQuery(id)
            );
            return dbResponse.rows[0];
        },
    },
    Mutation: {
        deleteAnimalRegistration: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                deleteAnimalRegistrationQuery(id)
            );
            return dbResponse.rows[0];
        },
    },
    AnimalRegistration: {
        status: async ({ status }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getStatusTranslationQuery(status, language, defaultLanguage)
            );
            return dbResponse.rows[0].status;
        },
    },
};

export default resolvers;
