import { expect } from 'chai';
import supertest from 'supertest';

import { organizationTaskFields } from './testFields';
import validate from './validators/organizationTask.interface.validator';

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('Organization task test', () => {
    it('Return organization task list', (done) => {
        request.post('/graphql').send({
            query: `{ organizationTasks ${organizationTaskFields} }`,
        })
            .expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                const { body: { data: { organizationTasks } } } = res;
                expect(organizationTasks).to.be.an('array');
                validate(organizationTasks[0]);
                expect(organizationTasks).to.have.length.above(0);
                return done();
            });
    });

    it('Returns organization task id=1 with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ organizationTask(id: 1) ${organizationTaskFields} }`,
            })
            .expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
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
