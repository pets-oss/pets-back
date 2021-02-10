import { expect } from 'chai';
import supertest from 'supertest';
import { animalRegistrationFields } from './testFields';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe ('animalRegistration Graphql tests', () => {
    it ('Get all animal_id=6 registrations', (done) => {
        request.post('/graphql')
        .send({
            query: `{ registrations(id: 1)
                ${animalRegistrationFields}
            }`
        })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            const { body: { data: { registrations } } } = res;
            expect(registrations).to.be.an('array');
            return done();
        });
    })
})

describe ('animalRegistration Graphql mutations tests', () => {
    const registrationNo = `2021PandemicC19X${uuidv4()}`

    it ('Create animal_id=6 registration', (done) => {
        const mutation = 'createAnimalRegistration'
        const create = `{
            animalId: 6, 
            registrationNo: "${registrationNo}",
            registrationDate: "2021-01-01",
            status: Active
        }`
        const answer = {
            animalId: 6,
            registrationNo: registrationNo,
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
            registrationNo: "456Carl",
            registrationDate: "2021-01-01",
            status: Active
        }`
        const answer = {
            animalId: 3, 
            registrationNo: "456Carl",
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

    it ('Update animal_id=3 registrationNo', (done) => {
        const mutation = 'updateAnimalRegistration'
        const update = `{
            animalId: 3, 
            registrationNo: "456Carl",
            newRegistrationNo: "${registrationNo}",
            registrationDate: "2021-01-01",
            status: Active
        }`
        const answer = {
            animalId: 3, 
            registrationNo: registrationNo,
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

    it ('Update animal_id=3 registrationNo to previous value (to be able to run the test again)', (done) => {
        const mutation = 'updateAnimalRegistration'
        const update = `{
            animalId: 3,
            registrationNo: "${registrationNo}",
            newRegistrationNo: "456Carl",
            registrationDate: "2021-01-07",
            status: Active
        }`
        const answer = {
            animalId: 3, 
            registrationNo: "456Carl",
            registrationDate: new Date("2021-01-07").getTime().toString(),
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
            registrationNo: "${registrationNo}",
        }`
        const answer = {
            animalId: 6, 
            registrationNo: registrationNo,
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

    it ('Undelete animal_id=6 registration', (done) => {
        const mutation = 'undeleteAnimalRegistration'
        const update = `{
            animalId: 6, 
            registrationNo: "${registrationNo}",
        }`
        const answer = {
            animalId: 6, 
            registrationNo: registrationNo,
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
