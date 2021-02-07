import { IResolvers } from 'graphql-tools';
import { getStatusTranslationQuery } from '../../sql-queries/status';

const defaultLanguage: string = 'lt';

const resolvers: IResolvers = {
    AnimalMicrochip: {
        status: async ({ status }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getStatusTranslationQuery(status, language, defaultLanguage));

            return dbResponse.rows[0].status;
        }
    }
};

export default resolvers;
