import { expect } from 'chai';

import validate from './validators/event.interface.validator';
import { authorFields } from './authorFields';

import requests from './utils/requests';

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
        ${eventGiveawayDetailFields}
    }
`;

const eventGiveawayFields = `
    ${eventCommonFields}
    ${eventGiveawayDetailFields}
`;

describe('GraphQL event integration tests', () => {
    it('Return list of events for all animals', (done) => {
        const req = requests(`{ events
                  ${eventFields}
        }`);

        req.expect(200)
            .end((err: any, res: { body: any; }) => {
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
    const req = requests(`{ events(types: ['Giveaway'])
              ${eventGiveawayFields}
    }`);

    req.expect(200)
        .end((err: any, res: { body: any; }) => {
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
