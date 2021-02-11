import { IResolvers } from 'graphql-tools';
import {
  getActiveAnimalRegistrationQuery,
  createAnimalRegistrationQuery,
  updateAnimalRegistrationQuery,
  deleteAnimalRegistrationQuery,
} from '../../sql-queries/animalRegistration';
import { getStatusTranslationQuery } from '../../sql-queries/status';

const defaultLanguage: string = 'lt';

const resolvers: IResolvers = {
  Query: {
    registration: async (_, { id }, { pgClient }) => {
      const dbResponse = await pgClient.query(getActiveAnimalRegistrationQuery(id));
      return dbResponse.rows[0];
    },
  },
  Mutation: {
    createAnimalRegistration: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(createAnimalRegistrationQuery(input));
      return dbResponse.rows[0];
    },
    updateAnimalRegistration: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(updateAnimalRegistrationQuery(input));
      return dbResponse.rows[0];
    },
    deleteAnimalRegistration: async (_, { id }, { pgClient }) => {
      const dbResponse = await pgClient.query(deleteAnimalRegistrationQuery(id));
      return dbResponse.rows[0];
    },
  },
  AnimalRegistration: {
    status: async ({ status }, { language }, { pgClient }) => {
      const dbResponse = await pgClient.query(getStatusTranslationQuery(status, language, defaultLanguage));
      return dbResponse.rows[0].status;
    }
  },
};

export default resolvers;
