// axios here is only for testing purposes
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

async function getBearerToken() {
    const data = {
        client_id: process.argv[3],
        client_secret: process.argv[4],
        audience: process.argv[5],
        grant_type: process.argv[6],
    };
    try {
        const response = await axios.post(process.argv[2], data);
        // eslint-disable-next-line no-console
        console.log(response.data.access_token);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message);
    }
    return null;
}

getBearerToken();
