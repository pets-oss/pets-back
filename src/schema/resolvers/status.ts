import { IResolvers } from 'graphql-tools';
import { getStatusesQuery } from '../../sql-queries/status';

const resolvers: IResolvers = {
    Query: {
        statuses: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getStatusesQuery(language));
            return dbResponse.rows;
        },
    },
};

export default resolvers;
