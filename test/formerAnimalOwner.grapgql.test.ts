import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/formerAnimalOwner.interface.validator';
import { formerAnimalOwnerFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('GraphQL former animal owner integration tests', () => {
    it('Returns all former animal owners with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `
                {
                  formerAnimalOwners ${formerAnimalOwnerFields}
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
                        data: { formerAnimalOwners },
                    },
                } = res;
                validate(formerAnimalOwners[0]);
                expect(formerAnimalOwners).to.be.an('array');
                expect(formerAnimalOwners).length.above(2);
                return done();
            });
    });
    it('Returns former animal owner id=1 with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `
                {
                  formerAnimalOwner(id: 1) ${formerAnimalOwnerFields}
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
                        data: { formerAnimalOwner },
                    },
                } = res;
                validate(formerAnimalOwner);
                return done();
            });
    });
});
