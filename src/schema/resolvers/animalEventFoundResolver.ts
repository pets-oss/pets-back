import { IResolvers } from 'graphql-tools';
import { Validator } from 'node-input-validator';
import { ValidationError } from 'apollo-server-express';
import {
    getAnimalFoundEventsQuery,
    createAnimalFoundEventQuery
} from '../../sql-queries/animalEventFound';

const resolvers: IResolvers = {
    Query: {
        foundEvents: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getAnimalFoundEventsQuery()
            );
            return dbResponse.rows;
        }
    },
    Mutation: {
        createFoundEvent: async (_, { input }, { pgClient }) => {
            const createFoundEventInputValidator = new Validator(input, {
                street: 'maxLength:255',
                houseNo: 'maxLength:8',
                municipalityId: 'integer|min:1',
                animalId: 'integer|min:1',
                date: 'date|dateBeforeToday:0,days'
            });
            const isCreateFoundEventInputValid =
                await createFoundEventInputValidator.check();

            if (!isCreateFoundEventInputValid) {
                throw new ValidationError(
                    JSON.stringify(createFoundEventInputValidator.errors)
                );
            }

            const dbResponse = await pgClient.query(
                createAnimalFoundEventQuery(input)
            );
            return dbResponse.rows[0];
        }
    }
};

export default resolvers;
