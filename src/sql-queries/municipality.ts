import { QueryConfig } from 'pg';

const getMunicipalitiesQuery = (): QueryConfig => {
    const text = 'SELECT * FROM municipality';
    return { text };
};

export default getMunicipalitiesQuery;
