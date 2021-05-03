import { expect } from 'chai';
import { Kind } from 'graphql';
import dateScalar from '../src/schema/scalars/Date';

const VALID_DATES = ['2021-02-28', '2020-02-29', '2021-01-01'];
const INVALID_DATES = ['2021-02-29', '2021.01.01', '2021-01-32'];
describe('Date scalar tests', () => {
    describe('valid dates', () => {
        it('serialize', () => {
            VALID_DATES.forEach(date => {
                expect(dateScalar.serialize(date)).to.equal(date);
            });
        });
        it('parseValue', () => {
            VALID_DATES.forEach(date => {
                expect(dateScalar.parseValue(date)).to.equal(date);
            });
        });
        it('parseLiteral', () => {
            VALID_DATES.forEach(date => {
                expect(dateScalar.parseLiteral({
                    value: date,
                    kind: Kind.STRING
                }, {})).to.equal(date);
            });
        });
    });
    describe('invalid dates', () => {
        it('parseValue', () => {
            INVALID_DATES.forEach(date => {
                expect(() => dateScalar.parseValue(date)).to.throw();
            });
        });
        it('parseLiteral', () => {
            INVALID_DATES.forEach(date => {
                expect(() => dateScalar.parseLiteral({
                    value: date,
                    kind: Kind.STRING
                }, {})).to.throw();
            });
        });
    });
});
