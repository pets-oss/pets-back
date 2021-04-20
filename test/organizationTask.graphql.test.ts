import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/organizationTask.interface.validator';
import { organizationTaskFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('GraphQL organization task integration tests', () => {
    it('Returns all organization tasks with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `
                {
                  organizationTasks ${organizationTaskFields}
                }
              `,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                const {
                    body: {
                        data: { organizationTasks },
                    },
                } = res;
                validate(organizationTasks[0]);
                expect(organizationTasks).to.be.an('array');
                expect(organizationTasks).length.above(0);
                return done();
            });
    });
    it('Returns organization task id=1 with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `
                {
                  organizationTask(id: 1) ${organizationTaskFields}
                }
              `,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                const {
                    body: {
                        data: { organizationTask },
                    },
                } = res;
                validate(organizationTask);
                return done();
            });
    });
});
