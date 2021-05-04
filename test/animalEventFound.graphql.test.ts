import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/animalEventFound.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('Animal Event Found', () => {
    it('Returns all events', (done) => {
        request
            .post('/graphql')
            .send({
                query: `{
                    foundEvents {
                      id
                      street
                      date
                      houseNo
                      animalId
                      municipalityId
                      comments
                  }
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

    it('Creates animal found event', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                    createFoundEvent (input: {
                      street: "Gyvūnų gatvė",
                      houseNo: "582",
                      municipalityId: 5,
                      date: "2021-05-03",
                      animalId: 4,
                      comments: "Dog was found dirty and hungry"
                    }) {
                      id,
                      street,
                      houseNo,
                      municipalityId,
                      date,
                      animalId,
                      comments
                    }
                  }`,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const expectedResult = {
                    street: 'Gyvūnų gatvė',
                    houseNo: '582',
                    municipalityId: 5,
                    date: '2021-05-03',
                    animalId: 4,
                    comments: 'Dog was found dirty and hungry',
                };
                expect(res.body.data.createFoundEvent).to.deep.include(
                    expectedResult
                );
                return done();
            });
    });


    it('Validates if data is correct format', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                    createFoundEvent (input: {
                      street: "Gyvūnų gatvė",
                      houseNo: "582",
                      municipalityId: 5,
                      date: "2021-05-43",
                      animalId: 4,
                      comments: "Dog was found dirty and hungry"
                    }) {
                      id,
                      street,
                      houseNo,
                      municipalityId,
                      date,
                      animalId,
                      comments
                    }
                  }`,
            })
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.errors[0].message).to.include('Invalid time value');
                return done();
            });
    });
});
