/**
 * Setup:
 * - Create custom action with post login trigger
 * - Add `pg` module
 * - Create POSTGRES secrets
 * - Add this action to login action flow
 */
const {Pool} = require('pg');

exports.onExecutePostLogin = async (event) => {
    const pool = new Pool({
        user: event.secrets.POSTGRES_USER,
        host: event.secrets.POSTGRES_HOST,
        database: event.secrets.POSTGRES_DB,
        password: event.secrets.POSTGRES_PASSWORD,
        port: parseInt(event.secrets.POSTGRES_PORT || '5432', 10),
        ssl: {
            rejectUnauthorized: false,
        },
    })
    const client = await pool.connect();
    const {user} = event;
    const result = await client.query({
        text: `INSERT INTO app_user (id, username, name, surname, email) VALUES ('${user.user_id}', '${user.nickname}', '${user.given_name}','${user.family_name}', '${user.email}') ON CONFLICT ON CONSTRAINT app_user_pkey DO NOTHING;`
    });
    console.log(result); // Find this in Monitoring > Logs > Success Login > Action Details
    client.release();
};
