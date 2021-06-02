import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/animalOwner.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);
const expectedResult = {
    name: 'Rimas',
    surname: 'Petravičius',
    phone: '+37068745124'
};

const animalOwnerFields = `
    {
        id,
        name,
        surname,
        phone
    }
`;

describe('GraphQL animal owner integration tests', () => {
    let animalOwnerId = -1;

    it('Returns all animal owners with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ animalOwners ${animalOwnerFields} }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { animalOwners } } } = res;
            expect(animalOwners).to.be.an('array');
            validate(animalOwners[0]);
            expect(animalOwners).to.have.length.above(2);
            return done();
        });
    });

    it('Returns animal owner id=1 with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ animalOwner(id: 1) ${animalOwnerFields} }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        }
        req.end((err, res) => {
            if (err) return done(err);
            validate(res.body.data.animalOwner);
            return done();
        });
    });

    it('Creates animal owner with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                          createAnimalOwner (input: {
                            name: "Rimas",
                            surname: "Petravičius",
                            phone: "+37068745124"
                          }) ${animalOwnerFields}
                    }`
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { createAnimalOwner } } } = res;
            validate(createAnimalOwner);
            ({ id: animalOwnerId } = createAnimalOwner);
            expect(createAnimalOwner).to.include(expectedResult);
            return done();
        });
    });

    it('Updates animal owner with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                        updateAnimalOwner (input: {
                            id: ${animalOwnerId},
                            name: "Rimas",
                            surname: "Petravičius",
                            phone: "+37068745124"
                        }) ${animalOwnerFields}
                    }`
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        }
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { updateAnimalOwner } } } = res;
            validate(updateAnimalOwner);
            expect(updateAnimalOwner).to.include({
                id: animalOwnerId,
                ...expectedResult
            });
            return done();
        });
    });
});
