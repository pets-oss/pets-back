import { IResolvers } from 'graphql-tools';
import { getChipCompaniesQuery } from '../../sql-queries/chipCompany';

const resolvers: IResolvers = {
    Query: {
        chipCompanies: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getChipCompaniesQuery(language)
            );
            return dbResponse.rows;
        },
    },
};

export default resolvers;
