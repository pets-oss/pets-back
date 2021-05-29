import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/event.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

// eslint-disable-next-line import/prefer-default-export
export const authorFields = `
    {
        id,
        username,
        name,
        surname,
        email,
    }
`;
const eventFields = `
    {
        id,
        animalId,
        group,
        type,
        dateTime,
        createTime
        author ${authorFields}
    }
`;

describe('GraphQL event integration tests', () => {
    it('Return list of events with generic information', (done) => {
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
                expect(events).to.have.length.above(4);
                return done();
            });
    });
});
