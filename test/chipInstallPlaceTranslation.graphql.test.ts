import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/translation.interface.validator';
import { translationFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('GraphQL chip install place integration tests', () => {
    it('Returns all chip install places in "lt" with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ chipInstallPlaces(language: "lt")
                    ${translationFields}
                }`,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const {
                    body: {
                        data: { chipInstallPlaces },
                    },
                } = res;
                expect(chipInstallPlaces).to.be.an('array');
                validate(chipInstallPlaces[0]);
                return done();
            });
    });
});
