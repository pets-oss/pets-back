import { IResolvers } from 'graphql-tools';
import {
  getActiveLastAnimalRegistrationQuery,
  getActiveAnimalRegistrationsQuery,
  createAnimalRegistrationQuery,
  updateAnimalRegistrationQuery,
  deleteAnimalRegistrationQuery,
  undeleteAnimalRegistrationQuery,
} from '../../sql-queries/animalRegistration';

const resolvers: IResolvers = {
  Query: {
    registration: async (_, { id }, { pgClient }) => {
      const dbResponse = await pgClient.query(getActiveLastAnimalRegistrationQuery(id));
      return dbResponse.rows[0];
    },
    registrations: async (_, { id }, { pgClient }) => {
      const dbResponse = await pgClient.query(getActiveAnimalRegistrationsQuery(id));
      return dbResponse.rows;
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
    deleteAnimalRegistration: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(deleteAnimalRegistrationQuery(input));
      return dbResponse.rows[0];
    },
    undeleteAnimalRegistration: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(undeleteAnimalRegistrationQuery(input));
      return dbResponse.rows[0];
    },
  },
};

export default resolvers;
