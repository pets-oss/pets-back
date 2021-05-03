import { expect } from 'chai';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { animalMicrochipFields } from './testFields';
import createAnimal from './helpers/createAnimalHelper';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);
let animalId: String;

describe('animalMicrochip Graphql mutations tests', () => {
    const registrationNo = `2021PandemicC19X${uuidv4()}`;
    const date = '2021-01-01';
    const dateIntString = new Date(date).getTime().toString();

    before((done) => {
        const microchipQuery = `microchip: {
            microchipId: "${registrationNo}",
                chipCompanyCode: 1,
                installDate: "${date}",
                installPlaceId: 1,
                status: Implanted
        }`;
        createAnimal(
            done,
            request,
            registrationNo,
            date,
            (id: String) => {
                animalId = id;
            },
            microchipQuery
        );
    });

    it('Delete animal microchip', (done) => {
        const mutation = 'deleteAnimalMicrochip';

        const answer = {
            animalId,
            microchipId: registrationNo,
            chipCompanyCode: 1,
            installDate: dateIntString,
            installPlaceId: 1,
            status: 'Implantuotas',
        };

        request
            .post('/graphql')
            .send({
                query: `
                    mutation {
                        ${mutation}(
                            animalId: ${animalId},
                            microchipId: "${registrationNo}"
                        )
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
