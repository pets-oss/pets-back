import { IResolvers } from 'graphql-tools';
import {
    createGiveawayEventQuery,
    updateGiveawayEventQuery,
} from '../../sql-queries/eventGiveaway';
import { getAuthor } from './author';

const resolvers: IResolvers = {
    GiveawayEvent: {
        author: getAuthor
    },
    Mutation: {
        createGiveawayEvent: async (_, { input }, { pgClient }) => {
        createGiveawayEvent: async (_, { input }, { pgClient, userId }) => {
            const dbResponse = await pgClient.query(
                createGiveawayEventQuery({...input, author: userId})
            );
            return dbResponse.rows[0];
        },
        updateGiveawayEvent: async (_, { input }, { pgClient, userId }) => {
            if (Object.keys(input).length < 2) {
                throw new Error(
                    'You have to provide at least one data field when updating an entity'
                );
            }
            const dbResponse = await pgClient.query(
                updateGiveawayEventQuery({...input, author: userId})

            );

            return dbResponse.rows[0];
        }
    }
};

export default resolvers;
