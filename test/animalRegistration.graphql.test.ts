import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/animalRegistration.interface.validator';
import { animalRegistrationFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe ('GraphQL animal_registration integration tests', () => {
    it ('Returns animal registration data for animal_id=1 with all fields', (done) => {
        request.post('/graphql')
            .send({
                query: `{ animalRegistrations(animal_id: 1) 
                    ${animalRegistrationFields}
                } `
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { animalRegistrations } } } = res;
                expect(animalRegistrations).to.be.an('array');
                validate(animalRegistrations[0]);
                expect(animalRegistrations).to.have.lengthOf(1);
                return done();
            });
    });

    it ('Returns all animals registration data with all fields', (done) => {
        request.post('/graphql')
            .send({
                query: `{ animalsRegistrations
                    ${animalRegistrationFields}
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { animalsRegistrations } } } = res;
                expect(animalsRegistrations).to.be.an('array');
                validate(animalsRegistrations[0]);
                expect(animalsRegistrations).to.have.lengthOf(5);
                return done();
            });
    });
});
