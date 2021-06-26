import { IResolvers } from 'graphql-tools';
import { Validator } from 'node-input-validator';
import { ValidationError } from 'apollo-server-express';
import {
    createStreetfindEventQuery,
    getStreetfindEventsQuery,
} from '../../sql-queries/eventStreetfind';
import { getAuthor } from './author';

const resolvers: IResolvers = {
    StreetfindEvent: {
        author: getAuthor
    },
    Query: {
        streetfindEvents: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getStreetfindEventsQuery()
            );
            return dbResponse.rows;
        },
    },
    Mutation: {
        createStreetfindEvent: async (_, { input }, { pgClient, userId }) => {
            const createStreetfindEventInputValidator = new Validator(input, {
                registrationDate: 'date|dateBeforeToday:0,days',
                registrationNo: 'maxLength:255',
                street: 'maxLength:255',
                houseNo: 'maxLength:8',
                municipalityId: 'integer|min:1',
                animalId: 'integer|min:1',
                date: 'date|dateBeforeToday:0,days'
            });
            // eslint-disable-next-line max-len
            const isCreateStreetfindEventInputValid = await createStreetfindEventInputValidator.check();

            if (!isCreateStreetfindEventInputValid) {
                throw new ValidationError(
                    JSON.stringify(createStreetfindEventInputValidator.errors)
                );
            }

            const dbResponse = await pgClient.query(
                createStreetfindEventQuery(input)
                createStreetfindEventQuery({...input, author: userId})
            );
            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
