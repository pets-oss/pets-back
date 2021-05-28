import { IResolvers } from 'graphql-tools';
import { ValidationError } from 'apollo-server-express';
import {
    getAnimalOwnersQuery,
    getAnimalOwnerQuery,
    createAnimalOwnerQuery,
    updateAnimalOwnerQuery
} from '../../sql-queries/animalOwner';

const resolvers: IResolvers = {
    Query: {
        animalOwners: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getAnimalOwnersQuery()
            );
            return dbResponse.rows;
        },
        animalOwner: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getAnimalOwnerQuery(id)
            );
            return dbResponse.rows[0];
        }
    },
    Mutation: {
        createAnimalOwner: async (_, { input }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                createAnimalOwnerQuery(input)
            );
            return dbResponse.rows[0];
        },
        updateAnimalOwner: async (
            _,
            { input },
            { pgClient }
        ) => {
            if (Object.keys(input).length < 2) {
                throw new ValidationError(
                    'You have to provide at least one data field when updating an entity'
                );
            }
            if (input.name === null) {
                throw new ValidationError('Name can not be null');
            }

            const dbResponse = await pgClient.query(
                updateAnimalOwnerQuery(input)
            );
            return dbResponse.rows[0];
        }
    }
};

export default resolvers;
