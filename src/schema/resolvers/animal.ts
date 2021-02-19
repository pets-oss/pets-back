import { IResolvers } from 'graphql-tools';
import {
  getAnimalQuery,
  getAnimalsQuery,
  createAnimalQuery,
  updateAnimalQuery,
} from '../../sql-queries/animal';
import {
  getAnimalDetailsQuery,
  createAnimalDetailsQuery,
  updateAnimalDetailsQuery,
} from '../../sql-queries/animalDetails';
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

        let createDetailsResult;
        if (input.details) {
          createDetailsResult = await pgClient.query(
              createAnimalDetailsQuery({ ...input.details, animalId })
          )
        }

        await pgClient.query('COMMIT');

        const result = {
          ...createAnimalResult.rows[0],
          registration: createRegistrationResult.rows[0],
        };

        if (!createDetailsResult) {
          return result;
        }
        return {
          ...result,
          details: createDetailsResult.rows[0],
        }
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

        const getAnimalDetailsResponse = await pgClient.query(
            getAnimalDetailsQuery(input.id)
        );
        let updateDetailsResult;
        if (getAnimalDetailsResponse.rows.length) {
          updateDetailsResult = await pgClient.query(
              updateAnimalDetailsQuery({
                ...input.details,
                animalId: input.id
              })
          )
        } else {
          updateDetailsResult = await pgClient.query(
              createAnimalDetailsQuery({
                ...input.details,
                animalId: input.id
              })
          )
        }

        await pgClient.query('COMMIT');
        return {
          ...updateAnimalResult.rows[0],
          registration: updateRegistrationResult.rows[0],
          details: updateDetailsResult.rows[0],
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
      if (!status) {
        return null;
      }
      const dbResponse = await pgClient.query(
        getStatusTranslationQuery(status, language, defaultLanguage)
      );

      return dbResponse.rows[0].status;
    },
  },
};

export default resolvers;
