import { expect } from 'chai';
import { validate }
    from '../src/schema/scalars/getStringScalarWithValidation';

describe('String Scalar with validation tests', () => {
    describe('Value type test', () => {
        const config = {
            name: 'JustString',
        };
        const VALID_VALUES = ['', 'abc', '123'];
        const INVALID_VALUES = [1, null, undefined, 3.2];
        it('Returns same value when given value is a string', () => {
            VALID_VALUES.forEach(value => {
                expect(validate(value, config)).to.equal(value);
            });
        });
        it('Throws error when given value is not a string', () => {
            INVALID_VALUES.forEach(value => {
                expect(() => validate(value, config)).to.throw();
            });
        });
    });
    describe('Max length tests', () => {
        const config = {
            name: 'StringMax6',
            max: 6
        };
        const VALID_LENGTH = ['', '123456', '123'];
        const INVALID_LENGTH = ['1234567'];

        it('Returns same value when string length is within limits', () => {
            VALID_LENGTH.forEach(value => {
                expect(validate(value, config)).to.equal(value);
            });
        });
        it('Throws error when string length exceeds max', () => {
            INVALID_LENGTH.forEach(value => {
                expect(() => validate(value, config)).to.throw();
            });
        });
    });
    describe('Pattern tests', () => {
        const config = {
            name: 'Pattern',
            pattern: /^abc.*?/
        };
        const VALID = ['abc', 'abcc', 'abc and more text after'];
        const INVALID = [' abc', 'aabc', '', 'ab'];

        it('Returns same value when pattern matches', () => {
            VALID.forEach(value => {
                expect(validate(value, config)).to.equal(value);
            });
        });
        it('Throws error when pattern does not match', () => {
            INVALID.forEach(value => {
                expect(() => validate(value, config)).to.throw();
            });
        });
    });
});
