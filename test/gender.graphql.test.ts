import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/translation.interface.validator';
import { translationFields } from './translationFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('GraphQL gender_translation integration tests', () => {
    it('Returns all genders translation in "lt" with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ genders(language: "lt")
                    ${translationFields}
                }`,
            });
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        } 
        req.expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { genders } } } = res;
                expect(genders).to.be.an('array');
                validate(genders[0]);
                return done();
            });
    });
});
