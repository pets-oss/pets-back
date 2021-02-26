import { IResolvers } from 'graphql-tools';
import { getStatusTranslationQuery } from '../../sql-queries/status';

import { deleteAnimalMicrochipQuery } from "../../sql-queries/animalMicrochip";

const defaultLanguage: string = 'lt';

const resolvers: IResolvers = {
    AnimalMicrochip: {
        status: async ({ status }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getStatusTranslationQuery(status, language, defaultLanguage));

            return dbResponse.rows[0].status;
        }
    },
    Mutation: {
        deleteAnimalMicrochip: async (_, {animalId, microchipId}, {pgClient}) => {
            const dbResponse = await pgClient.query(deleteAnimalMicrochipQuery(animalId, microchipId));
            return dbResponse.rows[0];
        },
    }
};

export default resolvers;
