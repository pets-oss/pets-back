import { IResolvers } from 'graphql-tools';
import getChipInstallPlacesTranslationQuery from '../../sql-queries/chipInstallPlaceTranslation';

const resolvers: IResolvers = {
    Query: {
        chipInstallPlaces: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getChipInstallPlacesTranslationQuery(language)
            );
            return dbResponse.rows;
        },
    },
};

export default resolvers;
