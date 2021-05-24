import { expect } from 'chai';
import supertest from 'supertest';
import {v4 as uuidv4} from 'uuid';
import createAnimal from './helpers/createAnimalHelper';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

// eslint-disable-next-line import/prefer-default-export
export const animalDetailsFields = `
    {
        animalId
        breed {
            id
            abbreviation
            value
        }
        species {
            id
            value
        }
        gender {
            id
            value
        }
        color {
            id
            value
        }
        birthDate
        weight
        allergy
        food
    }
`;

let animalId: String;

describe('animalDetails Graphql mutations tests', () => {
    const registrationNo = `2021PandemicC19X${uuidv4()}`;
    const date = '2021-01-01';
    const dateIntString = new Date(date).getTime().toString();

    before((done) => {
        const detailsQuery = `details: {
            breedId: 10,
                genderId: 2,
                colorId: 83,
                birthDate: "${date}",
                weight: 5,
                allergy: "nera",
                food: "bet koks"
        }`;
        createAnimal(done, request, registrationNo, date, (id: String) => {
            animalId = id;
        }, detailsQuery)
    });

    it('Delete animal details', (done) => {
        const mutation = 'deleteAnimalDetails';

        const answer = {
            animalId,
            breed: {
                id: 10,
                abbreviation: 'AK',
                value: 'Akitos'
            },
            species: {
                id: '1',
                value: 'Šuo',
            },
            gender: {
                id: '2',
                value: 'Patinas',
            },
            color: {
                id: 83,
                value: 'Balta'
            },
            birthDate: dateIntString,
            weight: 5,
            allergy: 'nera',
            food: 'bet koks'
        };

        let req = request
            .post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(id: ${animalId})
                            ${animalDetailsFields}
                }`,
            });
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        } 
        req.expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(JSON.stringify(res.body.data[mutation])).equal(
                    JSON.stringify(answer)
                );
                return done();
            });
    });
});
