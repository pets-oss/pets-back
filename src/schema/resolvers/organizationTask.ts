import { IResolvers } from 'graphql-tools';

import { getorganizationTasksQuery, getorganizationTaskQuery } from '../../sql-queries/organizationTask';

const resolvers: IResolvers = {
    Query: {
        organizationTasks: async (_, __, { pgClient }) => {
            const result = await pgClient.query(getorganizationTasksQuery());
            return result.rows;
        },
        organizationTask: async (_, { id }, { pgClient }) => {
            const result = await pgClient.query(getorganizationTaskQuery(id));
            return result.rows[0];
        }
    },
};
export default resolvers
