import { IResolvers } from 'graphql-tools';
import {
    createGivenAwayEventQuery,
    updateGivenAwayEventQuery,
} from '../../sql-queries/animalEventGivenAway';
import { getAuthor } from './author';

const resolvers: IResolvers = {
    GivenAwayEvent: {
        author: getAuthor
    },
    Mutation: {
        createGivenAwayEvent: async (_, { input }, { pgClient, userId }) => {
            const dbResponse = await pgClient.query(
                createGivenAwayEventQuery({...input, author: userId})
            );
            return dbResponse.rows[0];
        },
        updateGivenAwayEvent: async (_, { input }, { pgClient, userId }) => {
            if (Object.keys(input).length < 2) {
                throw new Error(
                    'You have to provide at least one data field when updating an entity'
                );
            }
            const dbResponse = await pgClient.query(
                updateGivenAwayEventQuery({...input, author: userId})
            );

            return dbResponse.rows[0];
        }
    }
};

export default resolvers;
