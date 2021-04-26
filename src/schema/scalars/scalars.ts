import getStringScalar from './getStringScalarWithValidation';

const nameScalar = getStringScalar({ name: 'Name', max: 255 });
const surnameScalar = getStringScalar({ name: 'Surname', max: 255 });
const phoneScalar = getStringScalar({
    name: 'Phone', pattern: /^\+3706\d{7}$/
});

export { nameScalar, surnameScalar, phoneScalar };
