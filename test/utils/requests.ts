import supertest from 'supertest';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);


interface Header {
    name: string;
    value: string;
}

const post = (payload: String, headers?: [Header]) => {
    let req = request
        .post('/graphql')
        .send({
            query: payload,
        });

    if (headers) {
        headers.forEach(header => {
            req = req.set(header.name, header.value)
        });
    }

    if (process.env.BEARER_TOKEN) {
        req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
    }

    return req
}

// const requestTest = (done: fn) =>
    // return done()

export default post;
