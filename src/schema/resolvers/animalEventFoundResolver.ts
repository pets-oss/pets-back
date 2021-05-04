import { IResolvers } from 'graphql-tools';
import { Validator } from 'node-input-validator';
import {
    getAnimalFoundEventsQuery,
    createAnimalEventFound,
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
        createFoundEvent: async (_, { input }, { pgClient }) => {
            const createFoundEventInputValidator = new Validator(input, {
                date: 'date|dateBeforeToday:0,days',
                street: 'maxLength:255',
                houseNo: 'maxLength:8',
                municipality: 'integer|min:1',
            });

            const isCreateFoundEventInputValid = 
            await createFoundEventInputValidator.check();

            if (!isCreateFoundEventInputValid) {
                throw new Error(
                    JSON.stringify(createFoundEventInputValidator.errors)
                );
            }
            const dbResponse = await pgClient.query(
                createAnimalEventFound(input)
            );
            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
