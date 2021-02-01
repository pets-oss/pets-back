import { IResolvers } from 'graphql-tools';
import { getColorsQuery } from '../../sql-queries/color';

const resolvers: IResolvers = {
    Query: {
        colors: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getColorsQuery(language));
            return dbResponse.rows;
        },
    },
};

export default resolvers;
