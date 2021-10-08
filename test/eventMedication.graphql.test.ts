import supertest from 'supertest';
import { expect } from 'chai';
import { authorFields } from './authorFields';
import validate from './validators/eventMedication.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

const eventMedicationFields = `
    {
        id,
        animalId,
        dateTime,
        comments,
        treatment,
        expenses,
        author ${authorFields}
    }
`;

describe('GraphQL medication event integration tests', () => {

    const expectedCreateResult = {
        animalId: 4,
        dateTime: '2021-10-08',
        comments: '1 dose have been administered already',
        treatment: 'Antibiotics 1 tablet per day for 10 days',
        expenses: 35.00,
        author: {
            id: 'userIdForTesting',
            name: 'Ąžuolas',
            surname: 'Krušna'
        }
    };

    it('Creates medication event with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                          createMedicationEvent(
                            input: {
                              animalId: 4
                              dateTime: "2021-10-08"
                              comments: "1 dose have been administered already"
                              treatment: "Antibiotics 1 tablet per day for 10 days"
                              expenses: 35.00
                            }
                          ) ${eventMedicationFields}
                        }`
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { createMedicationEvent } } } = res;
            validate(createMedicationEvent);
            expect(createMedicationEvent).to.deep.include(expectedCreateResult);
            return done();
        });
    });

    const expectedUpdateResult = {
        animalId: 4,
        dateTime: '2021-10-07',
        comments: 'Bacteria sample has been taken, results will come back in 7 days',
        treatment: 'Anti-inflammatory syrup 6ml per day, 1cm vitamin gel per day with food',
        expenses: 44.00,
        author: {
            id: 'userIdForTesting',
            name: 'Ąžuolas',
            surname: 'Krušna'
        }
    };

    it('Update Medication event with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                          updateMedicationEvent (
                            input: {
                              id: 1
                              animalId: 4
                              dateTime: "2021-10-07"
                              comments: "Bacteria sample has been taken, results will come back in 7 days"
                              treatment: "Anti-inflammatory syrup 6ml per day, 1cm vitamin gel per day with food"
                              expenses: 44.00
                            }
                          ) {
                            id
                            animalId
                            dateTime
                            comments
                            treatment
                            expenses
                            author {
                              id
                              name
                              surname
                            }
                          }
                        }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { updateMedicationEvent } } } = res;
            validate(updateMedicationEvent);
            expect(updateMedicationEvent).to.deep.include({
                id: 1,
                ...expectedUpdateResult,
            });
            return done();
        });
    });
});
