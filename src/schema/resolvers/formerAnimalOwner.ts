import { IResolvers } from 'graphql-tools';
import {
    getFormerAnimalOwnersQuery,
    getFormerAnimalOwnerQuery,
} from '../../sql-queries/formerAnimalOwner';

const resolvers: IResolvers = {
    Query: {
        formerAnimalOwners: async (_, __, { pgClient }) => {
            const result = await pgClient.query(getFormerAnimalOwnersQuery());
            return result.rows;
        },
        formerAnimalOwner: async (_, { id }, { pgClient }) => {
            const result = await pgClient.query(getFormerAnimalOwnerQuery(id));
            return result.rows[0];
        },
    },
};

export default resolvers;
