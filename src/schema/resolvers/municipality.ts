import { IResolvers } from 'graphql-tools';
import getMunicipalitiesQuery from '../../sql-queries/municipality';

const resolvers: IResolvers = {
    Query: {
        municipalities: async (_, __, { pgClient }) => {
            const result = await pgClient.query(getMunicipalitiesQuery());
            return result.rows;
        },
    },
};

export default resolvers;
