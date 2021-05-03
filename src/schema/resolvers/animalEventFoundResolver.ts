import { IResolvers } from 'graphql-tools';
import getAnimalFoundEventsQuery from '../../sql-queries/animalEventFound';

const resolvers: IResolvers = {
    Query: {
        foundEvents: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getAnimalFoundEventsQuery()
            );
            return dbResponse.rows;
        },
    },
};

export default resolvers;
