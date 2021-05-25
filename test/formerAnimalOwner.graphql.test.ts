import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/formerAnimalOwner.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

const formerAnimalOwnerFields = `
    {
        id,
        name,
        surname,
        phone
    }
`;

describe('GraphQL former animal owner integration tests', () => {
    it('Returns all former animal owners with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ formerAnimalOwners ${formerAnimalOwnerFields} }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        } 
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { formerAnimalOwners } } } = res;
            expect(formerAnimalOwners).to.be.an('array');
            validate(formerAnimalOwners[0]);
            expect(formerAnimalOwners).to.have.length.above(2);
            return done();
        });
    });

    it('Returns former animal owner id=1 with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ formerAnimalOwner(id: 1) ${formerAnimalOwnerFields} }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        } 
        req.end((err, res) => {
            if (err) return done(err);
            validate(res.body.data.formerAnimalOwner);
            return done();
        });
    });
});
