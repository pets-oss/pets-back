import { expect } from 'chai';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { animalDetailsFields } from './animalDetails.graphql.test';
import { animalMicrochipFields } from './animalMicrochip.graphql.test';
import { animalRegistrationFields } from './animalRegistration.graphql.test';
import validate from './validators/animal.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

const animalFields = `
    {
        id
        organization
        name
        details ${animalDetailsFields}
        registration ${animalRegistrationFields}
        microchip ${animalMicrochipFields}
        status
        imageUrl
        comments
        modTime
    }
`;

describe('GraphQL animal integration tests', () => {
    it('Returns animal id=1 with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ animal(id: 1)
                      ${animalFields}
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
                validate(res.body.data.animal);
                return done();
            });
    });
    it('Returns all animals with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ animals
                      ${animalFields}
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
                        data: { animals },
                    },
                } = res;
                expect(animals).to.be.an('array');
                validate(animals[0]);
                expect(animals).to.have.length.above(4);
                return done();
            });
    });

    it('Returns animals by array of ids [1,2,3] with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ animals (ids: [1,2,3])
                      ${animalFields}
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
                        data: { animals },
                    },
                } = res;
                expect(animals).to.be.an('array');
                validate(animals[0]);
                expect(animals).to.have.length(3);
                return done();
            });
    });

    it('Returns all animals with all fields filtered by species ids [1, 2], gender ids [1, 2] and breed ids [205, 268, 350]', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `
                {
                    animals (species: [1, 2], gender: [1, 2], breed: [205, 268, 350])
                        ${animalFields}
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
                        data: { animals },
                    },
                } = res;
                expect(animals).to.be.an('array');
                validate(animals[0]);
                expect(animals).to.have.length(3);
                return done();
            });
    });
});

describe('animal mutations tests', () => {
    const registrationNumberCreate = `2021PandemicC19X${uuidv4()}`;
    const registrationNumberUpdate = `2021PandemicC19X${uuidv4()}`;
    const date = '2021-01-01';
    const dateIntString = new Date(date).getTime().toString();
    let animalId = -1;

    it('Create animal', (done) => {
        const mutation = 'createAnimal';
        const create = `{
                  name: "Lokis",
                  organization: 2,
                  registration: {
                      registrationNo: "${registrationNumberCreate}",
                      registrationDate: "${date}",
                      status: Active
                  }
          }`;
        const answer = {
            organization: 2,
            name: 'Lokis',
            registration: {
                registrationNo: registrationNumberCreate,
                registrationDate: dateIntString,
                status: 'Aktyvus',
            },
        };

        let req = request
            .post('/graphql')
            .send({
                query: `
                      mutation {
                          ${mutation}(input: ${create})
                          ${animalFields}
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
                // eslint-disable-next-line prefer-destructuring
                animalId = res.body.data[mutation].id;
                expect(res.body.data[mutation]).to.deep.include(answer);
                return done();
            });
    });

    it('Update animal', (done) => {
        const mutation = 'updateAnimal';
        const update = `{
                id: 2,
                name: "Lokis",
                organization: 2,
                registration: {
                    registrationNo: "${registrationNumberUpdate}",
                    registrationDate: "${date}",
                    status: Active
                }
        }`;
        const answer = {
            id: 2,
            organization: 2,
            name: 'Lokis',
            registration: {
                registrationNo: registrationNumberUpdate,
                registrationDate: dateIntString,
                status: 'Aktyvus',
            },
        };

        let req = request
            .post('/graphql')
            .send({
                query: `
            mutation {
                ${mutation}(input: ${update})
                    ${animalFields}
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
                expect(res.body.data[mutation]).to.deep.include(answer);
                return done();
            });
    });

    it('Delete animal', (done) => {
        const mutation = 'deleteAnimal';
        const deleteInput = `{ id: ${animalId} }`;
        const expectedResponse = { id: animalId };

        let req = request
            .post('/graphql')
            .send({
                query: `
                mutation {
                ${mutation}(input: ${deleteInput})
                    ${animalFields}
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
                expect(res.body.data[mutation]).to.deep.include(
                    expectedResponse
                );
                return done();
            });
    });
});
