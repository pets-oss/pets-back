import { IResolvers } from 'graphql-tools';
import { Validator } from 'node-input-validator';
import {
    getAnimalFoundEventsQuery,
    updateAnimalEventFound,
} from '../../sql-queries/animalEventFound';

const resolvers: IResolvers = {
    Query: {
        foundEvents: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getAnimalFoundEventsQuery()
            );
            return dbResponse.rows;
        },
    },
    Mutation: {
        updateFoundEvent: async (_, { input }, { pgClient }) => {
            const updateFoundEventInputValidator = new Validator(input, {
                date: 'date|dateBeforeToday:0,days',
                street: 'string|maxLength:255',
                houseNo: 'string|maxLength:8',
            });

            const isUpdateFoundEventInputValid = await updateFoundEventInputValidator.check();

            if (!isUpdateFoundEventInputValid) {
                throw new Error(
                    JSON.stringify(updateFoundEventInputValidator.errors)
                );
            }

            const dbResponse = await pgClient.query(
                updateAnimalEventFound(input)
            );
            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
