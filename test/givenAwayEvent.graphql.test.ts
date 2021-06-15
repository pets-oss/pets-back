import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/givenAwayEvent.interface.validator';
import { authorFields } from './authorFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

const givenAwayEventFields = `
    {
        id,
        formerOwnerId,
        date,
        animalId,
        reason,
        author ${authorFields}
    }
`;

const expectedResult = {
    formerOwnerId: 3,
    reason: 'Leaving country',
    date: '2021-03-19',
    animalId: 4,
    author: {
        id: 'userIdForTesting',
        name: 'Ąžuolas',
        surname: 'Krušna',
    }
};

describe('GraphQL animal given away event integration tests', () => {
    it('Creates animal given away event with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                        createGivenAwayEvent (input: {
                            formerOwnerId: 3,
                            reason: "Leaving country",
                            date: "2021-03-19",
                            animalId: 4
                        }) ${givenAwayEventFields}
                    }`
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { createGivenAwayEvent } } } = res;
            validate(createGivenAwayEvent);
            expect(createGivenAwayEvent).to.deep.include(expectedResult);
            return done();
        });
    });

    it('Updates givenAwayEvent with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                        updateGivenAwayEvent (input: {
                            id: 1,
                            formerOwnerId: 3,
                            reason: "Leaving country",
                            date: "2021-03-19",
                            animalId: 4
                        }) ${givenAwayEventFields}
                    }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { updateGivenAwayEvent } } } = res;
            validate(updateGivenAwayEvent);
            expect(updateGivenAwayEvent).to.deep.include({
                id: 1,
                ...expectedResult,
            });
            return done();
        });
    });
});
