import { expect } from 'chai';
import supertest from 'supertest';
import validate from "./validators/organization.interface.validator";
import { organizationFields } from './testFields';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

let createdOrganizationId: Number;

describe ('GraphQL organization integration tests', () => {
    it ('Returns organization id=1 with all fields', (done) => {
        request.post('/graphql')
            .send({
                query: `{ organization(id: 1) ${organizationFields} }`
            })
            .expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) return done(err);
                validate(res.body.data.organization);
                return done();
            });
    });

    it ('Returns all organizations with all fields', (done) => {
        request.post('/graphql')
            .send({
                query: `{ organizations ${organizationFields} }`
            })
            .expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { organizations } } } = res;
                expect(organizations).to.be.an('array');
                validate(organizations[0]);
                expect(organizations).to.have.length.above(3);
                return done();
            });
    });

    it ('Creates organization with all fields', (done) => {
        const expectedResult = {
            name: "Gyvūnija",
            country: "Lithuania",
            city: "Kaunas",
            streetAddress: "Gyvūnų g. 65",
            phone: "+37067634285"
        };
        
        request.post('/graphql')
            .send({
                query:
                    `mutation {
                        createOrganization(input: {
                            name: "Gyvūnija",
                            country: "Lithuania",
                            city: "Kaunas",
                            streetAddress: "Gyvūnų g. 65",
                            phone: "+37067634285"
                        }) ${organizationFields}
                    }`
            }).expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { createOrganization } } } = res;
                createdOrganizationId = createOrganization.id;
                validate(createOrganization);
                expect(createOrganization).to.include(expectedResult);
                return done();
            });
    });

    it ('Updates organization with all fields', (done) => {
        const expectedResult = {
            id: 2,
            name: "Gyvūnija",
            country: "Lithuania",
            city: "Kaunas",
            streetAddress: "Gyvūnų g. 65",
            phone: "+37067634285"
        };
        request.post('/graphql')
            .send({
                query:
                    `mutation {
                        updateOrganization(input: {
                            id: 2,
                            name: "Gyvūnija",
                            country: "Lithuania",
                            city: "Kaunas",
                            streetAddress: "Gyvūnų g. 65",
                            phone: "+37067634285"
                        }) ${organizationFields}
                    }`
            }).expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { updateOrganization } } } = res;
                validate(updateOrganization);
                expect(updateOrganization).to.include(expectedResult);
                return done();
            });
    });

    it ('Deletes organization', (done) => {
        const expectedResult = {
            id: createdOrganizationId,
            name: "Gyvūnija",
            country: "Lithuania",
            city: "Kaunas",
            streetAddress: "Gyvūnų g. 65",
            phone: "+37067634285"
        };

        request.post('/graphql')
            .send({
                query:
                    `mutation {
                        deleteOrganization(id: ${createdOrganizationId}) ${organizationFields}
                    }`
            }).expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { deleteOrganization } } } = res;
                validate(deleteOrganization);
                expect(deleteOrganization).to.include(expectedResult);
                return done();
            });
    });

    it ('Deleted organization should not be in database', (done) => {
        request.post('/graphql')
            .send({
                query: `{ organization(id: ${createdOrganizationId}) ${organizationFields} }`
            })
            .expect(200)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.data.organization).to.be.a('null');
                return done();
            });
    });
});
