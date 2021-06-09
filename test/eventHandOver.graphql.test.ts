import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/eventHandOver.interface.validator';
import { authorFields } from './authorFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

const eventHandOverFields = `
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
        id: 'dhjbwau74a6',
        name: 'Sveikas',
        surname: 'Ūsas',
    }
};

describe('GraphQL hand over event integration tests', () => {
    it('Creates hand over event with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                        createHandOverEvent (input: {
                            formerOwnerId: 3,
                            reason: "Leaving country",
                            date: "2021-03-19",
                            animalId: 4,
                            author: "dhjbwau74a6"
                        }) ${eventHandOverFields}
                    }`
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { createHandOverEvent } } } = res;
            validate(createHandOverEvent);
            expect(createHandOverEvent).to.deep.include(expectedResult);
            return done();
        });
    });

    it('Updates givenHandOver with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                        updateHandOverEvent (input: {
                            id: 1,
                            formerOwnerId: 3,
                            reason: "Leaving country",
                            date: "2021-03-19",
                            animalId: 4,
                            author: "dhjbwau74a6"
                        }) ${eventHandOverFields}
                    }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { updateHandOverEvent } } } = res;
            validate(updateHandOverEvent);
            expect(updateHandOverEvent).to.deep.include({
                id: 1,
                ...expectedResult,
            });
            return done();
        });
    });
});
