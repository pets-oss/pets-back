import { expect } from 'chai';
import validate from './validators/breedWithSpecies.interface.validator';
import requests from './utils/requests';

const breedFields = `
    {
        id
        abbreviation
        value
        speciesId
        speciesValue
    }
`;

describe('GraphQL breed integration tests', () => {
    it('Returns breeds translation in "lt" with all fields filtered by species ', (done) => {
        const req = requests(`{ breeds(species: "2", language: "lt")
                    ${breedFields}
                }`);
        req.expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { breeds } } } = res;
                expect(breeds).to.be.an('array');
                validate(breeds[0]);
                return done();
            });
    });

    it('Returns all breeds translation in "lt" with all fields', (done) => {
        const req = requests(`{ breeds(language: "lt")
                    ${breedFields}
                }`);
        req.expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { body: { data: { breeds } } } = res;
                expect(breeds).to.be.an('array');
                validate(breeds[0]);
                return done();
            });
    });
});
