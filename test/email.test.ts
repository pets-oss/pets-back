import { expect } from 'chai';
import { Kind } from 'graphql';
import { emailScalar } from '../src/schema/scalars/scalars';

const VALID_EMAILS = ['viktorija@info.lt', 'name.surname@info.com', '45good@email.eu'];
const INVALID_EMAILS = ['bad.email', '@bad.lt'];
describe('Email scalar tests', () => {
    describe('valid emails', () => {
        it('serialize', () => {
            VALID_EMAILS.forEach(email => {
                expect(emailScalar.serialize(email)).to.equal(email);
            });
        });
        it('parseValue', () => {
            VALID_EMAILS.forEach(email => {
                expect(emailScalar.parseValue(email)).to.equal(email);
            });
        });
        it('parseLiteral', () => {
            VALID_EMAILS.forEach(email => {
                expect(emailScalar.parseLiteral({
                    value: email,
                    kind: Kind.STRING
                }, {})).to.equal(email);
            });
        });
    });

    describe('invalid emails', () => {
        it('parseValue', () => {
            INVALID_EMAILS.forEach(email => {
                expect(() => emailScalar.parseValue(email)).to.throw();
            });
        });
        it('parseLiteral', () => {
            INVALID_EMAILS.forEach(email => {
                expect(() => emailScalar.parseLiteral({
                    value: email,
                    kind: Kind.STRING
                }, {})).to.throw();
            });
        });
    });
});
