import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/translation.interface.validator';
import { translationFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('GraphQL color_translation integration tests', () => {
  it('Returns all colors translation in "lt" with all fields', (done) => {
    request
      .post('/graphql')
      .send({
        query: `{ colors(language: "lt") 
                    ${translationFields} 
                }`,
      })
      .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const {
          body: {
            data: { colors },
          },
        } = res;
        expect(colors).to.be.an('array');
        validate(colors[0]);
        return done();
      });
  });
});
