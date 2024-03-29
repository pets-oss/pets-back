import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/organizationTask.interface.validator';

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

const organizationTaskFields = `
    {
        id,
        title,
        description,
        organization,
        isDone
    }
`;

describe('OrganizationTasks test', () => {
    it('Returns organization tasks list', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ organizationTasks 
                        ${organizationTaskFields}
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
                        data: { organizationTasks },
                    },
                } = res;
                validate(organizationTasks[0]);
                expect(organizationTasks).to.be.an('array');
                expect(organizationTasks).length.to.be.above(5);
                return done();
            });
    });

    it('Returns specific organization task by id', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ organizationTask(id: 1)
                        ${organizationTaskFields}
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
                        data: { organizationTask },
                    },
                } = res;
                validate(organizationTask);
                return done();
            });
    });
});
