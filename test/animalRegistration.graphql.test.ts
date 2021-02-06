import { expect } from 'chai';
import supertest from 'supertest';
import { animalRegistrationFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe ('animalRegistration Graphql mutations tests', () => {
    it ('Create animal_id=6 registration', (done) => {
        const mutation = 'createAnimalRegistration'
        const create = `{
            animalId: 6, 
            registrationNo: "2021PandemicC19X00001",
            registrationDate: "2021-01-01",
            status: Active
        }`
        const answer = {
            animalId: 6,
            registrationNo: "2021PandemicC19X00001",
            registrationDate: new Date("2021-01-01").getTime().toString(),
            status: 'Active'
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

    it ('Update animal_id=3 registration', (done) => {
        const mutation = 'updateAnimalRegistration'
        const update = `{
            animalId: 3, 
            registrationNo: "2021PandemicC19X00002",
            registrationDate: "2021-01-01"
            status: Active
        }`
        const answer = {
            animalId: 3, 
            registrationNo: "2021PandemicC19X00002",
            registrationDate: new Date("2021-01-01").getTime().toString(),
            status: 'Active'
        }

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

    it ('Delete animal_id=6 registration', (done) => {
        const mutation = 'deleteAnimalRegistration'
        const update = `{
            animalId: 6, 
            registrationNo: "2021PandemicC19X00001",
        }`
        const answer = {
            animalId: 6, 
            registrationNo: "2021PandemicC19X00001",
        }

        request.post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(input: ${update}) 
                            { animalId registrationNo }
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

    it ('Create on deleted animal_id=6 registration', (done) => {
        const mutation = 'createAnimalRegistration'
        const update = `{
            animalId: 6, 
            registrationNo: "2021PandemicC19X00001",
            registrationDate: "2021-01-01",
            status: Inactive
        }`
        const answer = {
            animalId: 6, 
            registrationNo: "2021PandemicC19X00001",
            registrationDate: new Date("2021-01-01").getTime().toString(),
            status: 'Inactive'
        }

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

    it ('Delete animal_id=6 registration again (to be able to run tests multiple times in a row)', (done) => {
        const mutation = 'deleteAnimalRegistration'
        const update = `{
            animalId: 6, 
            registrationNo: "2021PandemicC19X00001",
        }`
        const answer = {
            animalId: 6, 
            registrationNo: "2021PandemicC19X00001",
        }

        request.post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(input: ${update}) 
                            { animalId registrationNo }
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
