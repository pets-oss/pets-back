import { IResolvers } from 'graphql-tools';
import { ValidationError } from 'apollo-server-express';
import niv from 'node-input-validator';
import {
    checkUserExistsByEmailNotIdQuery,
    checkUserExistsByIdQuery,
    checkUserExistsByUsernameNotIdQuery,
    createUserQuery,
    deleteUserQuery,
    getUserQuery,
    getUsersQuery,
    updateUserQuery,
} from '../../sql-queries/user';
import getUserRolesQuery from '../../sql-queries/role';

const uniqueUserFieldChecks = (pgClient: any) => async ({
    attr,
    value
}: { attr: string, value: any }, validator: any): Promise<boolean> => {

    let response;
    switch (attr) {
    case 'email':
        response = await pgClient.query(
            checkUserExistsByEmailNotIdQuery(value, validator.inputs.id));
        break;
    case 'username':
        response = await pgClient.query(
            checkUserExistsByUsernameNotIdQuery(value, validator.inputs.id));
        break;
    case 'id':
        response = await pgClient.query(
            checkUserExistsByIdQuery(value));
        break;
    default:
        return false;
    }

    return !response.rows[0].exists;
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

            niv.extend('unique', uniqueUserFieldChecks(pgClient));

            const userInputValidator = new niv.Validator(input, {
                id: 'required|maxLength:255|unique',
                username: 'required|maxLength:128|unique',
                name: 'maxLength:255',
                surname: 'maxLength:255',
                email: 'required|email|maxLength:255|unique'
            });

            const isUserInputValid = await userInputValidator.check();

            if (!isUserInputValid) {
                throw new ValidationError(
                    JSON.stringify(userInputValidator.errors)
                );
            }

            const dbResponse = await pgClient.query(createUserQuery(input));
            return dbResponse.rows[0];
        },

        updateUser: async (_, { input }, { pgClient }) => {
            if (Object.keys(input).length < 2) {
                throw new ValidationError(
                    'You have to provide at least one data field when updating an entity'
                );
            }

            niv.extend('unique', uniqueUserFieldChecks(pgClient));

            const userInputValidator = new niv.Validator(input, {
                id: 'required|maxLength:255',
                username: 'sometimes|maxLength:128|unique',
                name: 'maxLength:255',
                surname: 'maxLength:255',
                email: 'sometimes|email|maxLength:255|unique'
            });

            const isUserInputValid = await userInputValidator.check();

            if (!isUserInputValid) {
                throw new ValidationError(
                    JSON.stringify(userInputValidator.errors)
                );
            }
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
