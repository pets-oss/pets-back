import { IResolvers } from 'graphql-tools';
import {
  getActiveAnimalRegistrationQuery,
  createAnimalRegistrationQuery,
  updateAnimalRegistrationQuery,
  deleteAnimalRegistrationQuery,
  isAnimalRegistrationQuery,
  undeleteAnimalRegistrationQuery,
} from '../../sql-queries/animalRegistration';

const resolvers: IResolvers = {
  Query: {
    registration: async (_, { id }, { pgClient }) => {
      const dbResponse = await pgClient.query(getActiveAnimalRegistrationQuery(id));
      return dbResponse.rows[0];
    },
  },
  Mutation: {
    createAnimalRegistration: async (_, { input }, { pgClient }) => {
      const isAnimalRegistration = await pgClient.query(isAnimalRegistrationQuery(input));
      if (isAnimalRegistration.rows[0] && isAnimalRegistration.rows[0].delete_time) {
        const dbResponse = await pgClient.query(undeleteAnimalRegistrationQuery(input));
        return dbResponse.rows[0];
      }
      if (isAnimalRegistration.rows[0] && isAnimalRegistration.rows[0].registration_no) {
        throw new Error('This registration for this animal already exists');
      }
      const dbResponse = await pgClient.query(createAnimalRegistrationQuery(input));
      return dbResponse.rows[0];
    },
    updateAnimalRegistration: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(updateAnimalRegistrationQuery(input));
      return dbResponse.rows[0];
    },
    deleteAnimalRegistration: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(deleteAnimalRegistrationQuery(input));
      return dbResponse.rows[0];
    },
  },
};

export default resolvers;
