import { IResolvers } from 'graphql-tools';
import {
    getFormerAnimalOwnersQuery,
    getFormerAnimalOwnerQuery
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
        },
    }
};

export default resolvers;
