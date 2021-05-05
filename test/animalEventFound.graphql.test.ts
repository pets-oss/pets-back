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
    it('Creates a new found event', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                    createFoundEvent (input: {
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
                        data: { createFoundEvent },
                    },
                } = res;
                expect(createFoundEvent.street).to.be.eq('Gyvūnų gatvė');
                expect(createFoundEvent.houseNo).to.be.eq('58');

                return done();
            });
    });

    it('Should validate inputs', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                    createFoundEvent (input: {
                      street: "Gyvūnų gatvė",
                      houseNo: "587777779",
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
                    body: { errors },
                } = res;

                expect(errors[0].message).to.be.contain(
                    'The house no can not be greater than 8.'
                );

                return done();
            });
    });
});
