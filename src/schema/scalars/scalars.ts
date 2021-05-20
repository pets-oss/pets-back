import getStringScalar from './getStringScalarWithValidation';
import config from '../../config';

const nameScalar = getStringScalar({ name: 'Name', max: 255 });
const surnameScalar = getStringScalar({ name: 'Surname', max: 255 });
const phoneScalar = getStringScalar({
    name: 'Phone', pattern: new RegExp(`^\\+${config.phoneCountryCode}\\d{8,10}$`)
});

export { nameScalar, surnameScalar, phoneScalar };
