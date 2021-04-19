import { IResolvers } from 'graphql-tools';

import { PubSub } from 'apollo-server-express';
import {
    getOrganizationQuery,
    getOrganizationsQuery,
    createOrganizationQuery,
    updateOrganizationQuery,
    deleteOrganizationQuery,
} from '../../sql-queries/organization';


const pubsub = new PubSub();

const resolvers: IResolvers = {
    Query: {
        organizations: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getOrganizationsQuery());
            return dbResponse.rows;
        },
        organization: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(getOrganizationQuery(id));
            return dbResponse.rows[0];
        },
    },
    Mutation: {
        createOrganization: async (_, { input }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                createOrganizationQuery(input)
            );
            pubsub.publish('ORGANIZATION_CREATED', { organizationCreated: dbResponse.rows[0] });
            return dbResponse.rows[0];
        },
        updateOrganization: async (_, { input }, { pgClient }) => {
            if (Object.keys(input).length < 2) {
                throw new Error(
                    'You have to provide at least one data field when updating an entity'
                );
            }
            const dbResponse = await pgClient.query(
                updateOrganizationQuery(input)
            );

            return dbResponse.rows[0];
        },
        deleteOrganization: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                deleteOrganizationQuery(id)
            );
            return dbResponse.rows[0];
        },
    },
    Subscription: {
        organizationCreated: {
            subscribe: () => pubsub.asyncIterator(['ORGANIZATION_CREATED'])
        }
    }
};

export default resolvers;
