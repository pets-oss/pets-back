import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/event.interface.validator';
import { authorFields } from './authorFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

const eventCommonFields = `
    id,
    animalId,
    group,
    type,
    dateTime,
    createTime
    author ${authorFields}
    comments
`;

const eventGiveawayDetailFields = `
    ...on Giveaway {
        details {
            registrationDate
            registrationNo
            reason
            formerOwner {
                id
                name
                surname
                phone
            }
        }
    }
`;

const eventFields = `
    {
        ${eventCommonFields}
        ...on Surgery {
            details {
                surgery
                result
                expenses
            }
        }
        ...on Medication {
            details {
              treatment
              expenses
            }
          }
        ...on Streetfind {
            details {
                registrationDate
                registrationNo
                street
                houseNo
                municipalityId
            }
        }
        ...on LocationChange {
            details {
                street
                houseNo
                municipalityId
            }
        }
        ${eventGiveawayDetailFields}
    }
`;

const eventGiveawayFields = `
    ${eventCommonFields}
    ${eventGiveawayDetailFields}
`;

describe('GraphQL event integration tests', () => {
    it('Return list of events for all animals', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ events
                  ${eventFields}
              }`,
            });
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        }
        req.expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                const {
                    body: {
                        data: { events },
                    },
                } = res;
                expect(events).to.be.an('array');
                validate(events[0]);
                expect(events).to.have.length.above(1);
                return done();
            });
    });
});

it('Return list of Giveaway events for all animals', (done) => {
    let req = request
        .post('/graphql')
        .send({
            query: `{ events(types: ['Giveaway'])
              ${eventGiveawayFields}
          }`,
        });
    if (process.env.BEARER_TOKEN) {
        req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
    }
    req.expect(200)
        .end((err, res) => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(res.body);
                return done(err);
            }
            const {
                body: {
                    data: { events },
                },
            } = res;
            expect(events).to.be.an('array');
            validate(events[0]);
            expect(events).to.have.length.above(1);
            return done();
        });
});
