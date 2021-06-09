import { IResolvers } from 'graphql-tools';
import { Validator } from 'node-input-validator';
import { ValidationError } from 'apollo-server-express';
import {
    createRescueEventQuery,
    getRescueEventsQuery,
} from '../../sql-queries/eventRescue';
import { getAuthor } from './author';

const resolvers: IResolvers = {
    RescueEvent: {
        author: getAuthor
    },
    Query: {
        rescueEvents: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getRescueEventsQuery()
            );
            return dbResponse.rows;
        },
    },
    Mutation: {
        createRescueEvent: async (_, { input }, { pgClient }) => {
            const createRescueEventInputValidator = new Validator(input, {
                street: 'maxLength:255',
                houseNo: 'maxLength:8',
                municipalityId: 'integer|min:1',
                animalId: 'integer|min:1',
                date: 'date|dateBeforeToday:0,days',
                author: 'maxLength:255',
            });
            // eslint-disable-next-line max-len
            const isCreateRescueEventInputValid = await createRescueEventInputValidator.check();

            if (!isCreateRescueEventInputValid) {
                throw new ValidationError(
                    JSON.stringify(createRescueEventInputValidator.errors)
                );
            }

            const dbResponse = await pgClient.query(
                createRescueEventQuery(input)
            );
            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
