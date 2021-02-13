import { expect } from 'chai';
import supertest from 'supertest';
import { animalMicrochipFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

const date = "2021-01-01";
const dateIntString = new Date("2021-01-01").getTime().toString();

describe ('animalMicrochip Graphql mutations tests', () => {
    it ('Create animalId=1, microchipId="abc" microchip', (done) => {
        const mutation = 'createMicrochip'
        const input = `{
            animalId: 1,
            microchipId: "abc", 
            chipCompanyCode: 1,
            installDate: "${date}",
            installPlace: 1,
            status: Implanted
        }`
        const answer = {
            animalId: 1,
            microchipId: "abc",
            chipCompanyCode: 1,
            installDate: dateIntString,
            installPlace: 1,
            status: "Implanted"
        }

        request.post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(input: ${input}) 
                            ${animalMicrochipFields}
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(JSON.stringify(res.body.data[mutation])).equal(JSON.stringify(answer))
                return done();
            });
    });

    it ('Update animalId=1, microchipId="abc" microchip', (done) => {
        const mutation = 'updateMicrochip'
        const input = `{
            animalId: 1,
            microchipId: "abc", 
            chipCompanyCode: 2,
            installDate: "${date}",
            installPlace: 2,
            status: Removed
        }`
        const answer = {
            animalId: 1,
            microchipId: "abc",
            chipCompanyCode: 2,
            installDate: dateIntString,
            installPlace: 2,
            status: "Removed"
        }

        request.post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(input: ${input})
                            ${animalMicrochipFields}
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(JSON.stringify(res.body.data[mutation])).equal(JSON.stringify(answer))
                return done();
            });
    });

    it ('Delete animalId=1, microchipId="abc" microchip', (done) => {
        const mutation = 'deleteMicrochip'
        const params = `
            animalId: 1, 
            microchipId: "abc",
        `
        const answer = {
            animalId: 1,
            microchipId: "abc",
        }

        request.post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(${params}) 
                            { animalId microchipId }
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(JSON.stringify(res.body.data[mutation])).equal(JSON.stringify(answer))
                return done();
            });
    });
});
