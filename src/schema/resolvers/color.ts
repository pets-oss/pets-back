import { IResolvers } from 'graphql-tools';
import { getColorsQuery } from '../../sql-queries/color';

const resolvers: IResolvers = {
    Query: {
        colors: async (_, { language, speciesId }, { pgClient }) => {
            const dbResponse = await pgClient.query(getColorsQuery(language, speciesId));
            return dbResponse.rows;
        },
    },
};

export default resolvers;
