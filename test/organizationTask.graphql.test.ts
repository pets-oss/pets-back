import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/organizationTask.interface.validator';

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('Organization Tasks test', () => {
    it('Returns organization tasks list', (done) => {
        request
            .post('/graphql')
            .send({
                query: `
                {
                    organizationTasks {
                      id,
                      title,
                      description,
                      organizationId,
                      isDone
                    }
                  }`,
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
                expect(organizationTasks).to.be.an('array');
                validate(organizationTasks[0]);
                expect(organizationTasks).to.have.length.above(0);
                return done();
            });
    });
    it('Returns organization task by ID', (done) => {
        request
            .post('/graphql')
            .send({
                query: `
                {
                    organizationTask(id: 1) {
                      id,
                      title,
                      description,
                      organizationId,
                      isDone
                    }
                  }`,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                validate(res.body.data.organizationTask);
                return done();
            });
    });
});
