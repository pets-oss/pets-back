import { IResolvers } from 'graphql-tools';
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
        updateFormerAnimalOwner: async (_, { input }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                updateFormerAnimalOwnerQuery(input)
            );
            return dbResponse.rows[0];
        }
    }
};

export default resolvers;
