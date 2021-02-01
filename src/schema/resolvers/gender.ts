import { IResolvers } from 'graphql-tools';
import { getGendersQuery } from '../../sql-queries/gender';

const resolvers: IResolvers = {
    Query: {
        genders: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getGendersQuery(language));
            return dbResponse.rows;
        },
    },
};

export default resolvers;
