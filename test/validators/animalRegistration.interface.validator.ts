import { inspect } from 'util';
import Ajv from 'ajv';
import AnimalRegistration from '../interfaces/animalRegistration.interface';

export const ajv = new Ajv({
    allErrors: true,
    coerceTypes: false,
    format: 'fast',
    nullable: true,
    unicode: true,
    uniqueItems: true,
    useDefaults: true
});

export const properties = {
    type: 'object',
    properties: {
        animal_id: {
            type: 'number'
        },
        registration_no: {
            type: [ 'string', 'null' ]
        },
        registration_date: {
            type: [ 'string', 'null' ]
        },
        status: {
            type: ['string', 'null']
        }
    },
    required: [ 'animal_id', 'registration_no', 'registration_date', 'status' ]
}

export const AnimalRegistrationSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    defaultProperties: [],
    ...properties
};

export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>

export const isAnimalRegistration = ajv.compile(AnimalRegistrationSchema) as ValidateFunction<AnimalRegistration>;

export default function validate(value: unknown): AnimalRegistration {
    if (isAnimalRegistration(value)) {
        return value;
    }

    const errors = isAnimalRegistration.errors!.filter((e: any) => e.keyword !== 'if');

    throw new Error(`${ajv.errorsText(errors, { dataVar: 'AnimalRegistration' })} \n ${inspect(value)}`);
}
