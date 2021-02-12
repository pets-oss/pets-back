import { IResolvers } from 'graphql-tools';
import {
  getAnimalQuery,
  getAnimalsQuery,
  createAnimalQuery,
  updateAnimalQuery,
} from '../../sql-queries/animal';
import getAnimalDetailsQuery from '../../sql-queries/animalDetails';
import { getImplantedAnimalMicrochipQuery } from '../../sql-queries/animalMicrochip';
import {
  getActiveAnimalRegistrationQuery,
  createAnimalRegistrationQuery,
  updateAnimalRegistrationQuery,
} from '../../sql-queries/animalRegistration';
import { getStatusTranslationQuery } from '../../sql-queries/status';

const defaultLanguage: string = 'lt';

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
      try {
        await pgClient.query('BEGIN');

        const createAnimalResult = await pgClient.query(
          createAnimalQuery(input)
        );
        const animalId = createAnimalResult.rows[0].id;
        const createRegistrationResult = await pgClient.query(
          createAnimalRegistrationQuery({ ...input.registration, animalId })
        );
        await pgClient.query('COMMIT');

        return {
          ...createAnimalResult.rows[0],
          registration: createRegistrationResult.rows[0],
        };
      } catch (e) {
        await pgClient.query('ROLLBACK');
        throw e;
      }
    },
    updateAnimal: async (_, { input }, { pgClient }) => {
      try {
        await pgClient.query('BEGIN');
        const updateAnimalResult = await pgClient.query(
          updateAnimalQuery(input)
        );
        const updateRegistrationResult = await pgClient.query(
          updateAnimalRegistrationQuery({
            ...input.registration,
            animalId: input.id,
          })
        );
        await pgClient.query('COMMIT');
        return {
          ...updateAnimalResult.rows[0],
          registration: updateRegistrationResult.rows[0],
        };
      } catch (e) {
        await pgClient.query('ROLLBACK');
        throw e;
      }
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
    status: async ({ status }, { language }, { pgClient }) => {
      const dbResponse = await pgClient.query(
        getStatusTranslationQuery(status, language, defaultLanguage)
      );

      return dbResponse.rows[0]?.status;
    },
  },
};

export default resolvers;
