import chai from 'chai';
import supertest from 'supertest';
import validate from "./breed.interface.validator";

require('dotenv').config({path: './test/.env'});

const {expect} = chai;
const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('Getting breeds', () => {
    it('Returns all breeds', (done) => {
        request.post('/graphql')
            .send({
                query: `{ breeds(language: "lt", species: "2") {id, code, value} }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const {body: {data: {breeds}}} = res;
                expect(breeds).to.be.an('array');
                validate(breeds[0]);
                /* eslint-disable @typescript-eslint/no-unused-expressions */
                expect(breeds.some((breed: { id: string; }) => breed.id === '360')).to.be.true;
                expect(breeds.some((breed: { code: string; }) => breed.code === 'ABY')).to.be.true;
                expect(breeds.some((breed: { value: string; }) => breed.value === 'Abisinijos katės')).to.be.true;
                expect(breeds).to.have.lengthOf(75);
                return done();
            });
    });
});
