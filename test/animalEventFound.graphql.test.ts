import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/animalEventFound.interface.validator';
import { animalFoundEventFields } from './testFields';

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
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const {
                    body: {
                        data: { foundEvents }
                    }
                } = res;
                expect(foundEvents).to.be.an('array');
                expect(foundEvents).to.have.length.above(1);
                validate(foundEvents[0]);
                return done();
            });
    });
});

describe('Animal Event Found mutations tests', () => {
    it('Create animal event found', (done) => {
        const mutation = 'createFoundEvent';
        const create = `{
                street: "Gyvūnų gatvė",
                houseNo: "58",
                municipalityId: 5,
                date: "2021-03-19",
                animalId: 4,
                comments: "Dog was found dirty and hungry"
          }`;
        const answer = {
            street: 'Gyvūnų gatvė',
            houseNo: '58',
            municipalityId: 5,
            date: '2021-03-19',
            animalId: 4,
            comments: 'Dog was found dirty and hungry'
        };

        request
            .post('/graphql')
            .send({
                query: `
                      mutation {
                          ${mutation}(input: ${create})
                                ${animalFoundEventFields}
                  }`
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                expect(res.body.data[mutation]).to.deep.include(answer);
                return done();
            });
    });
    it('Create animal event found with invalid input throws Error', (done) => {
        const mutation = 'createFoundEvent';
        const create = `{
                street: "Gyvūnų gatvė",
                houseNo: "6",
                municipalityId: 5,
                date: "2040-03-19",
                animalId: 4,
                comments: "Dog was found dirty and hungry"
          }`;

        request
            .post('/graphql')
            .send({
                query: `
                      mutation {
                          ${mutation}(input: ${create})
                            ${animalFoundEventFields}
                  }`
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                expect(res.body.data[mutation]).equal(null);
                expect(res.body.errors[0].message).to.have.include('date');
                return done();
            });
    });
});
