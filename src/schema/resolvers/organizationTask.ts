import { IResolvers } from 'graphql-tools';

import {
    getOrganizationTasksQuery,
    getOrganizationTaskQuery,
} from '../../sql-queries/organizationTask';

const resolvers: IResolvers = {
    Query: {
        organizationTasks: async (_, __, { pgClient }) => {
            const result = await pgClient.query(getOrganizationTasksQuery());
            return result.rows;
        },
        organizationTask: async (_, { id }, { pgClient }) => {
            const result = await pgClient.query(getOrganizationTaskQuery(id));
            return result.rows[0];
        },
    },
};
export default resolvers;
