import { expect } from 'chai';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { animalMicrochipFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);
let animalId: String;

describe ('animalMicrochip Graphql mutations tests', () => {
    const registrationNo = `2021PandemicC19X${uuidv4()}`;
    const date = '2021-01-01';
    const dateIntString = new Date(date).getTime().toString();

    before((done) => {
        request
            .post('/graphql')
            .send({
                query: `
                      mutation {
                      createAnimal(input: {
                          name: "Lokis",
                          organization: 2,
                          registration: {
                              registrationNo: "${registrationNo}",
                              registrationDate: "${date}",
                              status: Active
                          },
                          microchip: {
                              microchipId: "${registrationNo}",
                              chipCompanyCode: 1,
                              installDate: "${date}",
                              installPlace: 1,
                              status: Implanted
                          }
                      })
                      {id}
                    }`,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log('Failed on animalDetails test preparation');
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    return done(err);
                }
                animalId = res.body.data.createAnimal.id;
                return done();
            });
    });

    it('Delete animal microchip', (done) => {
        const mutation = 'deleteAnimalMicrochip';

        const answer = {
            animalId,
            microchipId: registrationNo,
            chipCompanyCode: 1,
            installDate: dateIntString,
            installPlace: 1,
            status: 'Implantuotas'
        };

        request
            .post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(animalId: ${animalId}, microchipId: "${registrationNo}") 
                            ${animalMicrochipFields}
                }`,
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(JSON.stringify(res.body.data[mutation])).equal(
                    JSON.stringify(answer)
                );
                return done();
            });
    });
});
