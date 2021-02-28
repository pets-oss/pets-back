import initPostgres from '../services/postgres';

export default async () => {
    const pgClient = await initPostgres();

    return {
        pgClient
    };
};
