import getStringScalar from './getStringScalarWithValidation';
import { phoneFormatByCountry } from '../../config';

export const nameScalar = getStringScalar({ name: 'Name', max: 255 });
export const surnameScalar = getStringScalar({ name: 'Surname', max: 255 });

function getPhoneCodes() {
    const phoneCountryCodes = Object.values(phoneFormatByCountry);
    return phoneCountryCodes.length > 0 ?
        phoneCountryCodes.join('|') : '370';
}

export const phoneScalar = getStringScalar({
    name: 'Phone',
    pattern: new RegExp(`^\\+(${getPhoneCodes()})\\d{8,10}$`)
});

export const emailScalar = getStringScalar({
    name: 'Email',
    max: 255,
    pattern: new RegExp(/\b[\w.-]+@[\w.-]+.\w{2,4}\b/),
});
