import { IResolvers } from 'graphql-tools';
import { getBreedsQuery } from '../../sql-queries/breed';

const resolvers: IResolvers = {
    Query: {
        breeds: async (_, { species, language }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getBreedsQuery(species, language)
            );
            return dbResponse.rows;
        },
    },
};

export default resolvers;
