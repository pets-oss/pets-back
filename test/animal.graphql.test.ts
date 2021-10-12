import { expect } from 'chai';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { animalDetailsFields } from './animalDetails.graphql.test';
import { animalMicrochipFields } from './animalMicrochip.graphql.test';
import { animalRegistrationFields } from './animalRegistration.graphql.test';
import validate from './validators/animal.interface.validator';
import validateAnimalConnection
    from './validators/animalConnection.interface.validator';

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
        isFavorite
    }
`;

const animalConnectionFields = `
    {
        edges {
            node ${animalFields}
            cursor
        }
        pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
            totalCount
        }
    }
`;

const favoriteAnimalFields = `
{
    animalId
    userId
}`

describe('GraphQL animal query tests', () => {
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
                       ${animalConnectionFields}
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
                validateAnimalConnection(animals);
                expect(animals.edges).to.be.an('array');
                expect(animals.edges).to.have.length.above(4)
                expect(animals.edges.length).equal(animals.pageInfo.totalCount);
                return done();
            });
    });

    it('Returns animals by array of ids [1,2,3] with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ animals (ids: [1,2,3])
                      ${animalConnectionFields}
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
                validateAnimalConnection(animals);
                expect(animals.edges).to.be.an('array');
                expect(animals.edges).to.have.length(3);
                expect(animals.pageInfo.totalCount).to.equal(3);
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
                        ${animalConnectionFields}
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
                validateAnimalConnection(animals);
                expect(animals.edges).to.be.an('array');
                expect(animals.edges).to.have.length(3);
                return done();
            });
    });

    it('Returns first 2 animals', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `
                {
                    animals (first: 2)
                        ${animalConnectionFields}
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
                validateAnimalConnection(animals);
                expect(animals.edges).to.be.an('array');
                expect(animals.edges).to.have.length(2);
                return done();
            });
    });

    it('Returns first 2 animals after cursor="MQ=="', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `
                {
                    animals (first: 2, after: "MQ==")
                        ${animalConnectionFields}
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
                validateAnimalConnection(animals);
                expect(animals.edges).to.be.an('array');
                expect(animals.edges).to.have.length(2);
                return done();
            });
    });

    it('Returns first 2 favorite animals ', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `
                {
                    animals (first: 2, isFavoriteOnly: true)
                        ${animalConnectionFields}
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
                validateAnimalConnection(animals);
                expect(animals.edges).to.be.an('array');
                expect(animals.edges).to.have.length(2);
                for (let i = 0; i < animals.edges.length; i += 1) {
                    expect(animals.edges[i].node.isFavorite).to.be.equal(true)
                }
                return done();
            });
    });

    it('Returns favorite animals for a user without favorite animals', (done) => {
        let req = request
            .post('/graphql')
            .set('fake-user', 'userIdForTestingNoFavoriteAnimals')
            .send({
                query: `
                {
                    animals (isFavoriteOnly: true)
                        ${animalConnectionFields}
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
                validateAnimalConnection(animals);
                expect(animals.edges).to.be.an('array');
                expect(animals.edges).to.have.length(0);
                return done();
            });
    });

    it('Throws error for first -1 animal ', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `
                {
                    animals (first: -1)
                        ${animalConnectionFields}
                }`,
            });
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        }
        req.expect(400)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }

                expect(res.body.data).equal(undefined);
                expect(res.body.errors[0].message).to.equal('first can not be less than zero');
                return done();
            });
    });
});

describe('GraphQL animal mutations tests', () => {
    const registrationNumberCreate = `2021PandemicC19X${uuidv4()}`;
    const registrationNumberUpdate = `2021PandemicC19X${uuidv4()}`;
    const date = '2021-01-01';
    let animalId = -1;

    it('Create animal', (done) => {
        const mutation = 'createAnimal';
        const create = `{
                  name: "Lokis",
                  registration: {
                      registrationNo: "${registrationNumberCreate}",
                      registrationDate: "${date}",
                      status: Active
                  }
          }`;
        const answer = {
            organization: 1,
            name: 'Lokis',
            registration: {
                registrationNo: registrationNumberCreate,
                registrationDate: date,
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
                registrationDate: date,
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

    it('Update animal details to given species unidentified breed', (done) => {
        const mutation = 'updateAnimal';
        const update = `{
                id: 2,
                details: {
                    speciesId: 1
                }
        }`;
        const answer = {'details.breed.id': 8881 };

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
                expect(res.body.data[mutation]).to.deep.nested.include(answer);
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

describe('GraphQL favoriteAnimal tests', () => {
    it('Returns all favorite animals for user', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ favoriteAnimals
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
                        data: { favoriteAnimals },
                    },
                } = res;
                expect(favoriteAnimals).to.be.an('array');
                expect(favoriteAnimals).to.have.length.above(2)
                return done();
            });
    });

    it('Creates favoriteAnimal', (done) => {
        const mutation = 'createFavoriteAnimal';
        const createAnimalId = 4;
        const answer = {
            animalId: 4,
            userId: 'userIdForTesting',
        };

        let req = request
            .post('/graphql')
            .send({
                query: `
                      mutation {
                          ${mutation}(animalId: ${createAnimalId})
                          ${favoriteAnimalFields}
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
                expect(res.body.data[mutation]).to.deep.include(answer);
                return done();
            });
    });

    it('Deletes favoriteAnimal', (done) => {
        const mutation = 'deleteFavoriteAnimal';
        const createAnimalId = 4;
        const answer = {
            animalId: 4,
            userId: 'userIdForTesting',
        };

        let req = request
            .post('/graphql')
            .send({
                query: `
                      mutation {
                          ${mutation}(animalId: ${createAnimalId})
                          ${favoriteAnimalFields}
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
                expect(res.body.data[mutation]).to.deep.include(answer);
                return done();
            });
    });
});
