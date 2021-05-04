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

    it('Creates an animal event found', (done) => {
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

                const expectedResult = {
                    street: 'Gyvūnų gatvė',
                    houseNo: '58',
                    municipalityId: 5,
                    date: '2021-03-19',
                    animalId: 4,
                    comments: 'Dog was found dirty and hungry',
                };
                expect(res.body.data.createFoundEvent).to.deep.include(
                    expectedResult
                );
                return done();
            });
    });

    it('Validates if date is of correct format', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                    createFoundEvent (input: {
                      street: "Gyvūnų gatvė",
                      houseNo: "58",
                      municipalityId: 5,
                      date: "2021:03:19",
                      animalId: 4,
                      comments: "Dog was found dirty and hungry"
                    }) ${animalEventFoundFields}
                }`,
            })
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.errors[0].message).to.include(
                    'Value must be a string matching YYYY-MM-DD format'
                );
                return done();
            });
    });

    it('Validates if date is not in the future', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                    createFoundEvent (input: {
                      street: "Gyvūnų gatvė",
                      houseNo: "58",
                      municipalityId: 5,
                      date: "3021-03-19",
                      animalId: 4,
                      comments: "Dog was found dirty and hungry"
                    }) ${animalEventFoundFields}
                }`,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.errors[0].message).to.include(
                    'The date must be a date before 0 days'
                );
                return done();
            });
    });

    it('Validates if street name does not exceed the maximum length of 255 characters', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                    createFoundEvent (input: {
                      street: "Gyvūnų gatvė. Rasti Gyvūnų gatvę gali pasirodyti sudėtinga, tačiau tik iš pirmo žvilgsnio. Ji yra Lietuvos valstybėje, kuri - Žemės planetoje, o ši - Saulės sistemoje, tad... Apie šią gatvę sklando daug legendų. Manoma, kad joje vaidenasi mirusių gyvūnėlių sielos. Šiuos įvykius gana išsamiai aprašė Steven'as King'as, tačiau niekas iki šiol nežino, ar tai tik legendos...",
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
                expect(res.body.errors[0].message).to.include(
                    'The street can not be greater than 255'
                );
                return done();
            });
    });

    it('Validates if house number does not exceed the maximum length of 8 characters', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                    createFoundEvent (input: {
                      street: "Gyvūnų gatvė",
                      houseNo: "123456789",
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
                expect(res.body.errors[0].message).to.include(
                    'The house no can not be greater than 8'
                );
                return done();
            });
    });
});
