import { IResolvers } from 'graphql-tools';
import { getAppUserQuery } from '../../sql-queries/appUser';

export const getAuthor = async ({ author }: any, _: any, { pgClient }: any) => {
    const dbResponse = await pgClient.query(
        getAppUserQuery(author)
    );
    return dbResponse.rows[0];
};

const resolvers: IResolvers = {
    GivenAwayEvent: {
        author: getAuthor
    },
    FoundEvent: {
        author: getAuthor
    },
}

export default resolvers;
