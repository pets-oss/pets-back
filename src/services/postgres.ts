import { Pool, QueryConfig, QueryResult } from 'pg';

interface PostgresClient {
    disconnect: () => Promise<void>;
    query: (config: QueryConfig) => Promise<QueryResult>;
}

const pgClient = (pool: Pool): PostgresClient => ({
    disconnect: async () => {
        try {
            await pool.end();
        } catch (error) {
            console.error(error);
        }
    },
    query: async (config: QueryConfig) => {
        const client = await pool.connect();

        try {
            const result = await client.query(config);
            client.release();

            return result;
        } catch (error) {
            client.release();
            throw error;
        }
    },
});

export default async () => {
    // heroku postgres addon exports connection string as a DATABASE_URL.
    const connectionString = process.env.DATABASE_URL;
    const config = connectionString ? {
        connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    }
        :
        {
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        };
    const pool = new Pool(config);

    return pgClient(pool);
};
