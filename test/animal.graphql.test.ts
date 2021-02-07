import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/animal.interface.validator';
import { animalFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe ('GraphQL animal integration tests', () => {
    it ('Returns animal id=1 with all fields', (done) => {
        request.post('/graphql')
            .send({
                query: `{ animal(id: 1) 
                    ${animalFields}
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                validate(res.body.data.animal);
                return done();
            });
    });

    it ('Returns all animals with all fields', (done) => {
        request.post('/graphql')
            .send({
                query: `{ animals 
                    ${animalFields} 
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { animals } } } = res;
                expect(animals).to.be.an('array');
                validate(animals[0]);
                expect(animals).to.have.lengthOf(5);
                return done();
            });
    });

    it ('Deletes animal with id=5', (done) => {
        request.post('/graphql')
            .send({query: `mutation {
                deleteAnimal(input: {id: 5}) {
                  id
                  delTime
                }
              }`})
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { deleteAnimal } } } = res;
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                expect(deleteAnimal.delTime).to.not.be.null;
                expect(deleteAnimal.id).to.be.equal(5);
                return done();
            });
    });
});
