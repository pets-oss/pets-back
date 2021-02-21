import { expect } from 'chai';
import supertest from 'supertest';
import {v4 as uuidv4} from 'uuid';
import {animalDetailsFields} from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);
let animalId: String;

describe('animalDetails Graphql mutations tests', () => {
    const registrationNo = `2021PandemicC19X${uuidv4()}`;
    const date = '2021-01-01';
    const dateIntString = new Date(date).getTime().toString();

    before((done) => {
        request
            .post('/graphql')
            .send({
                query: `
                      mutation {
                      createAnimal(input: {
                          name: "Lokis",
                          organization: 2,
                          registration: {
                              registrationNo: "${registrationNo}",
                              registrationDate: "${date}",
                              status: Active
                          },
                          details: {
                              breedId: 10,
                              genderId: 2,
                              colorId: 83,
                              birthDate: "${date}",
                              weight: 5,
                              allergy: "nera",
                              food: "bet koks"
                          }
                      })
                      {id}
                    }`,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log('Failed on animalDetails test preparation');
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                animalId = res.body.data.createAnimal.id;
                return done();
            });
    });

    it('Delete animal details', (done) => {
        const mutation = 'deleteAnimalDetails';

        const answer = {
            animalId,
            breed: {
                id: 10,
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

        request
            .post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(id: ${animalId}) 
                            ${animalDetailsFields}
                }`,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(JSON.stringify(res.body.data[mutation])).equal(
                    JSON.stringify(answer)
                );
                return done();
            });
    });
});
