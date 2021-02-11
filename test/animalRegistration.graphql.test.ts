import { expect } from 'chai';
import supertest from 'supertest';
import { animalRegistrationFields } from './testFields';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe ('animalRegistration Graphql mutations tests', () => {
    const registrationNo = `2021PandemicC19X${uuidv4()}`;
    const date = "2021-01-01";
    const dateIntString = new Date("2021-01-01").getTime().toString();

    it ('Create animal_id=6 registration', (done) => {
        const mutation = 'createAnimalRegistration'
        const create = `{
            animalId: 6, 
            registrationNo: "${registrationNo}",
            registrationDate: "${date}",
            status: Active
        }`
        const answer = {
            animalId: 6,
            registrationNo: registrationNo,
            registrationDate: dateIntString,
            status: 'Active',
        }

        request.post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(input: ${create}) 
                            ${animalRegistrationFields}
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(JSON.stringify(res.body.data[mutation]))
                .equal(JSON.stringify(answer))
                return done();
            });
    });

    it ('Delete animal_id=6 registration', (done) => {
        const mutation = 'deleteAnimalRegistration';
        const id = 6;

        const answer = {
            animalId: id, 
            registrationNo: registrationNo,
            registrationDate: dateIntString,
            status: 'Active',
        };

        request.post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(id: 6) 
                            ${animalRegistrationFields}
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(JSON.stringify(res.body.data[mutation]))
                .equal(JSON.stringify(answer))
                return done();
            });
    });

    it ('Update animal_id=3 registration', (done) => {
        const mutation = 'updateAnimalRegistration';
        const update = `{
            animalId: 3, 
            registrationNo: "123456Carl",
            registrationDate: "${date}",
            status: Active
        }`;
        const answer = {
            animalId: 3,
            registrationNo: "123456Carl",
            registrationDate: dateIntString,
            status: 'Active',
        };

        request.post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(input: ${update})
                            ${animalRegistrationFields}
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(JSON.stringify(res.body.data[mutation]))
                .equal(JSON.stringify(answer))
                return done();
            });
    });
});
