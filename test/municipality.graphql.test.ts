import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/municipality.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('GraphQL municipality integration test', () => {
    it('Returns all municipalities with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `
                {
                  municipalities {
                    id,
                    name
                  }
                }
              `,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                const {
                    body: {
                        data: { municipalities },
                    },
                } = res;
                validate(municipalities[0]);
                expect(municipalities).to.be.an('array');
                expect(municipalities).length.above(10);
                return done();
            });
    });
});
