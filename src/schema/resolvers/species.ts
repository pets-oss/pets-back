import { IResolvers } from 'graphql-tools';
import { getSpeciesQuery } from '../../sql-queries/species';

const resolvers: IResolvers = {
    Query: {
        species: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getSpeciesQuery(language));
            return dbResponse.rows;
        },
    },
};

export default resolvers;
