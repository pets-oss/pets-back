import { IResolvers } from 'graphql-tools';
import { getStatusTranslationQuery } from '../../sql-queries/status';

import {
    createAnimalMicrochipQuery,
    updateAnimalMicrochipQuery,
    deleteAnimalMicrochipQuery,
} from '../../sql-queries/animalMicrochip';

const defaultLanguage: string = 'lt';

const resolvers: IResolvers = {
    AnimalMicrochip: {
        status: async ({ status }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getStatusTranslationQuery(status, language, defaultLanguage));

            return dbResponse.rows[0].status;
        }
    },
    Mutation: {
        createMicrochip: async (_, {input}, {pgClient}) => {
            const dbResponse = await pgClient.query(createAnimalMicrochipQuery(input));
            return dbResponse.rows[0];
        },
        updateMicrochip: async (_, {input}, {pgClient}) => {
            if (Object.keys(input).length < 2) {
                throw new Error(
                    'You have to provide at least one data field when updating an entity'
                );
            }
            const dbResponse = await pgClient.query(updateAnimalMicrochipQuery(input));
            return dbResponse.rows[0];
        },
        deleteMicrochip: async (_, {animalId, microchipId}, {pgClient}) => {
            const dbResponse = await pgClient.query(deleteAnimalMicrochipQuery(animalId, microchipId));
            return dbResponse.rows[0];
        },
    }
};

export default resolvers;
