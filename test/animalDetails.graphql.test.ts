import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/animalDetails.interface.validator';
import { animalDetailsFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe ('GraphQL animal_details integration tests', () => {
    it ('Returns animal details for animal_id=1 with all fields', (done) => {
        request.post('/graphql')
            .send({
                query: `{ animalDetails(animal_id: 1) 
                    ${animalDetailsFields}
                } `
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                validate(res.body.data.animalDetails);
                return done();
            });
    });

    it ('Returns all animals details with all fields', (done) => {
        request.post('/graphql')
            .send({
                query: `{ animalsDetails
                    ${animalDetailsFields}
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { animalsDetails } } } = res;
                expect(animalsDetails).to.be.an('array');
                validate(animalsDetails[0]);
                expect(animalsDetails).to.have.lengthOf(5);
                return done();
            });
    });
});
