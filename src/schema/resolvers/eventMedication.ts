import { IResolvers } from 'graphql-tools';
import { ValidationError } from 'apollo-server-express';
import {
    createMedicationEventQuery,
    updateMedicationEventQuery
} from '../../sql-queries/eventMedication';
import { getAuthor } from './author';

const medicationEventResolvers: IResolvers = {
    MedicationEvent: {
        author: getAuthor
    },
    Mutation: {
        createMedicationEvent: async (_, { input }, {
            pgClient,
            userId
        }) => {
            const dbResponse = await pgClient.query(
                createMedicationEventQuery({ ...input, author: userId })
            );
            return dbResponse.rows[0];
        },
        updateMedicationEvent: async (_, { input }, { pgClient, userId }) => {
            if (Object.keys(input).length < 2) {
                throw new ValidationError(
                    'You have to provide at least one data field when updating an entity'
                );
            }

            const dbResponse = await pgClient.query(
                updateMedicationEventQuery({...input, author: userId})

            );

            return dbResponse.rows[0];
        }
    }
};

export default medicationEventResolvers;
