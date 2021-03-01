import { expect } from 'chai';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { animalRegistrationFields } from './testFields';
import createAnimal from './helpers/createAnimalHelper';

require('dotenv').config({
    path: './test/.env',
});

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);
let animalId: String;

describe('animalRegistration Graphql mutations tests', () => {
    const registrationNo = `2021PandemicC19X${uuidv4()}`;
    const date = '2021-01-01';
    const dateIntString = new Date(date).getTime().toString();

    before((done) =>
        createAnimal(done, request, registrationNo, date, (id: String) => {
            animalId = id;
        })
    );

    it('Delete animal_id=6 registration', (done) => {
        const mutation = 'deleteAnimalRegistration';

        const answer = {
            registrationNo,
            registrationDate: dateIntString,
            status: 'Aktyvus',
        };

        request
            .post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(id: ${animalId})
                            ${animalRegistrationFields}
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
