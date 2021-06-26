import { expect } from 'chai';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import validate from './validators/eventGiveaway.interface.validator';
import { authorFields } from './authorFields';


require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

const eventGiveawayFields = `
    {
        id,
        registrationDate,
        registrationNo,
        formerOwnerId,
        date,
        animalId,
        reason,
        author ${authorFields}
    }
`;

describe('GraphQL giveaway event integration tests', () => {
    const registrationNoCreate = `2021X${uuidv4()}`;

    const expectedCreateResult = {
        registrationDate: '2021-01-04',
        registrationNo: registrationNoCreate,
        formerOwnerId: 3,
        reason: 'Leaving country',
        date: '2021-03-19',
        animalId: 4,
        author: {
            id: 'userIdForTesting',
            name: 'Ąžuolas',
            surname: 'Krušna'
        }
    };

    it('Creates giveaway event with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                        createGiveawayEvent (input: {
                            registrationDate: "2021-01-04",
                            registrationNo: "${registrationNoCreate}",
                            formerOwnerId: 3,
                            reason: "Leaving country",
                            date: "2021-03-19",
                            animalId: 4
                        }) ${eventGiveawayFields}
                    }`
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { createGiveawayEvent } } } = res;
            validate(createGiveawayEvent);
            expect(createGiveawayEvent).to.deep.include(expectedCreateResult);
            return done();
        });
    });


    const registrationNoUpdate = `2021X${uuidv4()}`;

    const expectedUpdateResult = {
        registrationDate: '2021-01-04',
        registrationNo: registrationNoUpdate,
        formerOwnerId: 3,
        reason: 'Leaving country',
        date: '2021-03-19',
        animalId: 4,
        author: {
            id: 'userIdForTesting',
            name: 'Ąžuolas',
            surname: 'Krušna'
        }
    };

    it('Update Giveaway event with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                        updateGiveawayEvent (input: {
                            id: 1,
                            registrationDate: "2021-01-04",
                            registrationNo: "${registrationNoUpdate}",
                            formerOwnerId: 3,
                            reason: "Leaving country",
                            date: "2021-03-19",
                            animalId: 4
                        }) ${eventGiveawayFields}
                    }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { updateGiveawayEvent } } } = res;
            validate(updateGiveawayEvent);
            expect(updateGiveawayEvent).to.deep.include({
                id: 1,
                ...expectedUpdateResult,
            });
            return done();
        });
    });
});
