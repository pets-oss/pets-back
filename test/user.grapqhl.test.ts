import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/user.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

const userFields = `
    {
        id
        username
        name
        surname
        email
        roles {
            organizationId
            roleType
        }
        modTime
    }
`;

describe('GraphQL user integration tests', () => {
    it('Returns user id="aiubfaw4io09" with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ user(id: "aiubfaw4io09") ${userFields} }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        } 
        req.end((err, res) => {
            if (err) return done(err);
            validate(res.body.data.user);
            return done();
        });
    });

    it('Returns all users with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ users ${userFields} }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        } 
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { users } } } = res;
            expect(users).to.be.an('array');
            validate(users[0]);
            expect(users).to.have.length.above(4);
            return done();
        });
    });

    it('Creates user with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                        createUser(input: {
                            id: "TestID",
                            username: "TestUsername",
                            name: "TestName",
                            surname: "TestSurname",
                            email: "TestEmail"
                        }) ${userFields}
                    }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        } 
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { createUser } } } = res;
            validate(createUser);
            expect(createUser.id).to.be.equals('TestID');
            expect(createUser.username).to.be.equals('TestUsername');
            expect(createUser.name).to.be.equals('TestName');
            expect(createUser.surname).to.be.equals('TestSurname');
            expect(createUser.email).to.be.equals('TestEmail');
            return done();
        });
    });

    it('Updates user with all fields', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                        updateUser(input: {
                            id: "TestID",
                            username: "UpdatedTestUsername",
                            name: "UpdatedTestName",
                            surname: "UpdatedTestSurname",
                            email: "UpdatedTestEmail"
                        }) ${userFields}
                    }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        } 
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { updateUser } } } = res;
            validate(updateUser);
            expect(updateUser.id).to.be.equals('TestID');
            expect(updateUser.username).to.be.equals('UpdatedTestUsername');
            expect(updateUser.name).to.be.equals('UpdatedTestName');
            expect(updateUser.surname).to.be.equals('UpdatedTestSurname');
            expect(updateUser.email).to.be.equals('UpdatedTestEmail');
            return done();
        });
    });

    it('Deletes user', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `mutation {
                        deleteUser(id:  "TestID") ${userFields}
                    }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        } 
        req.end((err, res) => {
            if (err) return done(err);
            const { body: { data: { deleteUser } } } = res;
            validate(deleteUser);
            expect(deleteUser.id).to.be.equals('TestID');
            expect(deleteUser.username).to.be.equals('UpdatedTestUsername');
            expect(deleteUser.name).to.be.equals('UpdatedTestName');
            expect(deleteUser.surname).to.be.equals('UpdatedTestSurname');
            expect(deleteUser.email).to.be.equals('UpdatedTestEmail');
            return done();
        });
    });

    it('Deleted user should not be in database', (done) => {
        let req = request
            .post('/graphql')
            .send({
                query: `{ user(id: "TestID") ${userFields} }`,
            })
            .expect(200);
        if (process.env.BEARER_TOKEN) {
            req = req.set('authorization', `Bearer ${process.env.BEARER_TOKEN}`)
        } 
        req.end((err, res) => {
            if (err) return done(err);
            expect(res.body.data.user).to.be.a('null');
            return done();
        });
    });
});
