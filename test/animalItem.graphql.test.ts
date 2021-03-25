import { expect } from "chai";
import supertest from "supertest";
import validate from './validators/animalItem.interface.validator';

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('AnimalItems test', () => {
    it('Returns animal items list', (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ animalItems {
                        id,
                        animalId,
                        itemName
                    }
                }`,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                const { body: { data: { animalItems } } } = res;
                validate(animalItems[0]);
                expect(animalItems).to.be.an('array');
                expect(animalItems).to.have.length.above(4);
                return done();
            });
    });

    it('Returns specific animal item by id', (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ animalItem(id: 2) {
                        id,
                        animalId,
                        itemName
                    }
                }`,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                const { body: { data: { animalItem } } } = res;
                validate(animalItem);
                return done();
            });
    });
})