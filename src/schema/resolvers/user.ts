import { IResolvers } from 'graphql-tools';
import {createUserQuery, deleteUserQuery, getUserQuery, getUsersQuery, updateUserQuery} from '../../sql-queries/user';
import getUserRolesQuery from "../../sql-queries/role";

const resolvers: IResolvers = {
    Query: {
        users: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getUsersQuery());
            return dbResponse.rows;
        },
        user: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(getUserQuery(id));
            return dbResponse.rows[0];
        },
    },
    User: {
        roles: async ({ id }, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getUserRolesQuery(id));
            return dbResponse.rows;
        }
    },
    Mutation: {
        createUser: async (_, { input }, { pgClient }) => {
            const dbResponse = await pgClient.query(createUserQuery(input));
            return dbResponse.rows[0];
        },
        updateUser: async (_, { input }, { pgClient }) => {
            if (Object.keys(input).length < 2) {
                throw new Error(
                    'You have to provide at least one data field when updating an entity'
                );
            }

            const dbResponse = await pgClient.query(updateUserQuery(input));
            return dbResponse.rows[0];
        },
        deleteUser: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(deleteUserQuery(id));
            return dbResponse.rows[0];
        }
    }
};

export default resolvers;
