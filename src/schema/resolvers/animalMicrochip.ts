import { IResolvers } from 'graphql-tools';
import { getStatusTranslationQuery } from '../../sql-queries/status';

import {
    createImplantedAnimalMicrochipQuery,
    updateImplantedAnimalMicrochipQuery,
    deleteImplantedAnimalMicrochipQuery,
    getDeleteTimeQuery,
} from "../../sql-queries/animalMicrochip";

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
            const dbResponse = await pgClient.query(createImplantedAnimalMicrochipQuery(input));
            return dbResponse.rows[0];
        },
        updateMicrochip: async (_, {input}, {pgClient}) => {
            if (Object.keys(input).length < 2) {
                throw new Error(
                    'You have to provide at least one data field when updating an entity'
                );
            }
            const getDeleteTimeResponse = await pgClient.query(
                getDeleteTimeQuery(input.animal_id, input.microchip_id)
            );
            if (getDeleteTimeResponse.rows[0].delete_time) {
                throw new Error('You are trying to update deleted animal microchip');
            }
            const dbResponse = await pgClient.query(updateImplantedAnimalMicrochipQuery(input));
            return dbResponse.rows[0];
        },
        deleteMicrochip: async (_, {animal_id, microchip_id}, {pgClient}) => {
            const getDeleteTimeResponse = await pgClient.query(
                getDeleteTimeQuery(animal_id, microchip_id)
            );
            if (getDeleteTimeResponse.rows[0].delete_time) {
                throw new Error('Animal microchip is already deleted');
            }
            const dbResponse = await pgClient.query(deleteImplantedAnimalMicrochipQuery(animal_id, microchip_id));
            return dbResponse.rows[0];
        },
    }
};

export default resolvers;
