import { IResolvers } from 'graphql-tools';
import { ValidationError } from 'apollo-server-express';
import {
    checkUserExistsByEmailNotIdQuery,
    checkUserExistsByIdQuery,
    createUserQuery,
    deleteUserQuery,
    getUserQuery,
    getUsersQuery,
    updateUserQuery,
} from '../../sql-queries/user';
import getUserRolesQuery from '../../sql-queries/role';

const checkUserEmailIsUnique = async (pgClient: any, input: any) => {
    const existsResponse = await pgClient.query(
        checkUserExistsByEmailNotIdQuery(input.email, input.id)
    );
    if (existsResponse.rows[0].exists) {
        throw new ValidationError(`User with email ${input.email} already exists`);
    }
};

const checkUserIdIsUnique = async (pgClient: any, id: string) => {
    const existsResponse = await pgClient.query(
        checkUserExistsByIdQuery(id)
    );
    if (existsResponse.rows[0].exists) {
        console.log(`Error was thrown ${id}`);
        throw new ValidationError(`User with id ${id} already exists`);
    }
    console.log('Error was not thrown');
};

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
        },
    },
    Mutation: {
        createUser: async (_, { input }, { pgClient }) => {
            await checkUserIdIsUnique(pgClient, input.id);
            await checkUserEmailIsUnique(pgClient, input);
            const dbResponse = await pgClient.query(createUserQuery(input));
            return dbResponse.rows[0];
        },
        updateUser: async (_, { input }, { pgClient }) => {
            if (Object.keys(input).length < 2) {
                throw new ValidationError(
                    'You have to provide at least one data field when updating an entity'
                );
            }
            await checkUserEmailIsUnique(pgClient, input);
            const dbResponse = await pgClient.query(updateUserQuery(input));
            return dbResponse.rows[0];
        },
        deleteUser: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(deleteUserQuery(id));
            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
