// axios here is only for testing purposes
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// minimist here is only for testing purposes
// eslint-disable-next-line import/no-extraneous-dependencies
const argv = require('minimist')(process.argv.slice(2));

async function getBearerToken() {
    const data = {
        client_id: argv.client_id,
        client_secret: argv.client_secret,
        audience: argv.audience,
        grant_type: argv.grant_type,
    };
    try {
        const response = await axios.post(argv.url, data);
        // eslint-disable-next-line no-console
        console.log(response.data.access_token);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message);
    }
    return null;
}

getBearerToken();
