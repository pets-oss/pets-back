import { IResolvers } from 'graphql-tools';
import {
  getOrganizationQuery,
  getOrganizationsQuery,
  createOrganizationQuery,
  updateOrganizationQuery,
  deleteOrganizationQuery,
  getDeleteTimeQuery,
} from '../../sql-queries/organization';

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
      const dbResponse = await pgClient.query(createOrganizationQuery(input));
      return dbResponse.rows[0];
    },
    updateOrganization: async (_, { input }, { pgClient }) => {
      if (Object.keys(input).length < 2) {
        throw new Error(
          'You have to provide at least one data field when updating an entity'
        );
      }
      const dbResponse = await pgClient.query(updateOrganizationQuery(input));

      return dbResponse.rows[0];
    },
    deleteOrganization: async (_, { id }, { pgClient }) => {
      const getDeleteTimeResponse = await pgClient.query(
        getDeleteTimeQuery(id)
      );
      if (getDeleteTimeResponse.rows[0].delete_time) {
        throw new Error('Organization is already deleted');
      }
      const dbResponse = await pgClient.query(deleteOrganizationQuery(id));
      return dbResponse.rows[0];
    },
  },
};

export default resolvers;
