import {
    expect
} from 'chai';
import supertest from 'supertest';
import validate from './validators/breed.interface.validator';
import {
    breedFields
} from './testFields';

require('dotenv').config({
    path: './test/.env'
});

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('GraphQL breed integration tests', () => {
    it('Returns all breeds translation in "lt" with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ breeds(species: "2", language: "lt")
                    ${breedFields}
                }`,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const {
                    body: {
                        data: {
                            breeds
                        },
                    },
                } = res;
                expect(breeds).to.be.an('array');
                validate(breeds[0]);
                return done();
            });
    });
});
