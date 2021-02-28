import {
    expect
} from 'chai';
import supertest from 'supertest';
import validate from './validators/status.interface.validator';

require('dotenv').config({
    path: './test/.env'
});

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('Getting statuses', () => {
    it('Returns all statuses', (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ statuses(language: "lt") {id, value} }`,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const {
                    body: {
                        data: {
                            statuses
                        },
                    },
                } = res;
                expect(statuses).to.be.an('array');
                validate(statuses[0]);
                expect(statuses[0].id).to.be.eq('healthy');
                expect(statuses[0].value).to.be.eq('Sveikas');
                expect(statuses).to.have.lengthOf(8);
                return done();
            });
    });
});
