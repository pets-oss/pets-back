import { IResolvers } from 'graphql-tools';
import {
    createHandOverEventQuery,
    updateHandOverEventQuery,
} from '../../sql-queries/eventHandOver';
import { getAuthor } from './author';

const resolvers: IResolvers = {
    HandOverEvent: {
        author: getAuthor
    },
    Mutation: {
        createHandOverEvent: async (_, { input }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                createHandOverEventQuery(input)
            );
            return dbResponse.rows[0];
        },
        updateHandOverEvent: async (_, { input }, { pgClient }) => {
            if (Object.keys(input).length < 2) {
                throw new Error(
                    'You have to provide at least one data field when updating an entity'
                );
            }
            const dbResponse = await pgClient.query(
                updateHandOverEventQuery(input)
            );

            return dbResponse.rows[0];
        }
    }
};

export default resolvers;
