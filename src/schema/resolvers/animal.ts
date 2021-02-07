import { IResolvers } from 'graphql-tools';
import {
  getAnimalQuery,
  getAnimalsQuery,
  createAnimalQuery,
  updateAnimalQuery,
  markAnimalDeletedQuery,
} from '../../sql-queries/animal';
import getAnimalDetailsQuery from '../../sql-queries/animalDetails';
import getActiveAnimalRegistrationQuery from '../../sql-queries/animalRegistration';
import getImplantedAnimalMicrochipQuery from '../../sql-queries/animalMicrochip';

const resolvers: IResolvers = {
  Query: {
    animals: async (_, __, { pgClient }) => {
      const dbResponse = await pgClient.query(getAnimalsQuery());
      return dbResponse.rows;
    },
    animal: async (_, { id }, { pgClient }) => {
      const dbResponse = await pgClient.query(getAnimalQuery(id));
      return dbResponse.rows[0];
    },
  },
  Mutation: {
    createAnimal: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(createAnimalQuery(input));

      return dbResponse.rows[0];
    },
    updateAnimal: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(updateAnimalQuery(input));

      return dbResponse.rows[0];
    },
    deleteAnimal: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(markAnimalDeletedQuery(input));

      return dbResponse.rows[0];
    },
  },
  Animal: {
    details: async ({ id }, __, { pgClient }) => {
      const dbResponse = await pgClient.query(getAnimalDetailsQuery(id));
      return dbResponse.rows[0];
    },
    registration: async ({ id }, __, { pgClient }) => {
      const dbResponse = await pgClient.query(
        getActiveAnimalRegistrationQuery(id)
      );
      return dbResponse.rows[0];
    },
    microchip: async ({ id }, __, { pgClient }) => {
      const dbResponse = await pgClient.query(
        getImplantedAnimalMicrochipQuery(id)
      );
      return dbResponse.rows[0];
    },
  },
};

export default resolvers;
