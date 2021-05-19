import { IResolvers } from 'graphql-tools';
import {
    createGivenAwayEventQuery,
    updateGivenAwayEventQuery
} from '../../sql-queries/animalEventGivenAway';

const resolvers: IResolvers = {
    Mutation: {
        createGivenAwayEvent: async (_, { input }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                createGivenAwayEventQuery(input)
            );
            return dbResponse.rows[0];
        },
        updateGivenAwayEvent: async (_, { input }, { pgClient }) => {
            if (Object.keys(input).length < 2) {
                throw new Error(
                    'You have to provide at least one data field when updating an entity'
                );
            }
            const dbResponse = await pgClient.query(
                updateGivenAwayEventQuery(input)
            );

            return dbResponse.rows[0];
        }
    }
};

export default resolvers;
