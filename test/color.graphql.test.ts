import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/color.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('GraphQL color_translation integration tests', () => {
    it('Returns all colors translation in "lt" with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ colors(language: "lt")
                    { id, value, speciesId, speciesName}
                }`,
            });
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        }
        req.expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { colors } } } = res;
                expect(colors).to.be.an('array');
                validate(colors[0]);
                return done();
            });
    });
});
