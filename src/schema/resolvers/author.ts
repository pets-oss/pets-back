import { getAppUserQuery } from '../../sql-queries/appUser';

// eslint-disable-next-line import/prefer-default-export
export const getAuthor = async ({ author }: any, _: any, { pgClient }: any) => {
    const dbResponse = await pgClient.query(
        getAppUserQuery(author)
    );
    return dbResponse.rows[0];
};
