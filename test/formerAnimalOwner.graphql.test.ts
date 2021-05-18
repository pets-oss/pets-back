import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/formerAnimalOwner.interface.validator';
import { formerAnimalOwnerFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);
const expectedResult = {
    name: 'Rimas',
    surname: 'Petravičius',
    phone: '+37068745124'
};

describe('GraphQL former animal owner integration tests', () => {
    let animalOwnerId = -1;

    it('Returns all former animal owners with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ formerAnimalOwners ${formerAnimalOwnerFields} }`,
            })
            .expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { formerAnimalOwners } } } = res;
                expect(formerAnimalOwners).to.be.an('array');
                validate(formerAnimalOwners[0]);
                expect(formerAnimalOwners).to.have.length.above(2);
                return done();
            });
    });

    it('Returns former animal owner id=1 with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ formerAnimalOwner(id: 1) ${formerAnimalOwnerFields} }`,
            })
            .expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) return done(err);
                validate(res.body.data.formerAnimalOwner);
                return done();
            });
    });

    it('Creates former animal owner with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                          createFormerAnimalOwner (input: {
                            name: "Rimas",
                            surname: "Petravičius",
                            phone: "+37068745124"
                          }) ${formerAnimalOwnerFields}
                    }`,
            })
            .expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { createFormerAnimalOwner } } } = res;
                validate(createFormerAnimalOwner);
                ({ id: animalOwnerId } = createFormerAnimalOwner);
                expect(createFormerAnimalOwner).to.include(expectedResult);
                return done();
            });
    });

    it('Updates former animal owner with all fields', (done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation {
                        updateFormerAnimalOwner (input: {
                            id: ${animalOwnerId},
                            name: "Rimas",
                            surname: "Petravičius",
                            phone: "+37068745124"
                        }) ${formerAnimalOwnerFields}
                    }`,
            })
            .expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { updateFormerAnimalOwner } } } = res;
                validate(updateFormerAnimalOwner);
                expect(updateFormerAnimalOwner).to.include({
                    id: animalOwnerId,
                    ...expectedResult,
                });
                return done();
            });
    });
});
