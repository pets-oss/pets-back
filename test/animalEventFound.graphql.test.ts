import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/animalEventFound.interface.validator';
import { animalEventFoundFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('Animal Event Found', () => {
    it('Returns all events', (done) => {
        request
            .post('/graphql')
            .send({
                query: `{
                    foundEvents ${animalEventFoundFields}
                }`,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const {
                    body: {
                        data: { foundEvents },
                    },
                } = res;
                expect(foundEvents).to.be.an('array');
                expect(foundEvents).to.have.length.above(1);
                validate(foundEvents[0]);
                return done();
            });
    });
    it('Upates a found event', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                    updateFoundEvent (input: {
                      id: 1,
                      street: "Gyvūnų gatvė",
                      houseNo: "58",
                      municipalityId: 5,
                      date: "2021-03-19",
                      animalId: 4,
                      comments: "Dog was found dirty and hungry"
                    }) ${animalEventFoundFields}
                  }`,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const {
                    body: {
                        data: { updateFoundEvent },
                    },
                } = res;
                expect(updateFoundEvent).to.include({
                    id: 1,
                    street: 'Gyvūnų gatvė',
                });

                return done();
            });
    });
});
