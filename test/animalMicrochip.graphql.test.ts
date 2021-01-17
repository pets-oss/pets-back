import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/animalMicrochip.interface.validaror';
import { animalMicrochipFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe ('GraphQL animal_microchip integration tests', () => {
    it ('Returns animal microchip data for animal_id=1 with all fields', (done) => {
        request.post('/graphql')
            .send({
                query: `{ animalMicrochips(animal_id: 1) 
                    ${animalMicrochipFields}
                } `
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { animalMicrochips } } } = res;
                expect(animalMicrochips).to.be.an('array');
                validate(animalMicrochips[0]);
                expect(animalMicrochips).to.have.lengthOf(1);
                return done();
            });
    });

    it ('Returns all animals microchip data with all fields', (done) => {
        request.post('/graphql')
            .send({
                query: `{ animalsMicrochips
                    ${animalMicrochipFields}
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { animalsMicrochips } } } = res;
                expect(animalsMicrochips).to.be.an('array');
                validate(animalsMicrochips[0]);
                expect(animalsMicrochips).to.have.lengthOf(5);
                return done();
            });
    });
});
