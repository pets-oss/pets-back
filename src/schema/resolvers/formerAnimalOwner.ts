import { IResolvers } from 'graphql-tools';
import { ValidationError } from 'apollo-server-express';
import {
    getFormerAnimalOwnersQuery,
    getFormerAnimalOwnerQuery,
    createFormerAnimalOwnerQuery,
    updateFormerAnimalOwnerQuery
} from '../../sql-queries/formerAnimalOwner';

const resolvers: IResolvers = {
    Query: {
        formerAnimalOwners: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getFormerAnimalOwnersQuery()
            );
            return dbResponse.rows;
        },
        formerAnimalOwner: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getFormerAnimalOwnerQuery(id)
            );
            return dbResponse.rows[0];
        }
    },
    Mutation: {
        createFormerAnimalOwner: async (_, { input }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                createFormerAnimalOwnerQuery(input)
            );
            return dbResponse.rows[0];
        },
        updateFormerAnimalOwner: async (
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
                updateFormerAnimalOwnerQuery(input)
            );
            return dbResponse.rows[0];
        }
    }
};

export default resolvers;
