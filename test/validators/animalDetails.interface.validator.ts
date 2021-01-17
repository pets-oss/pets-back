import { inspect } from 'util';
import Ajv from 'ajv';
import AnimalDetails from '../interfaces/animalDetails.interface';

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
        breed: {
            type: [ 'string', 'null' ]
        },
        species: {
            type: [ 'string', 'null' ]
        },
        gender: {
            type: [ 'string', 'null' ]
        },
        color: {
            type: [ 'string', 'null' ]
        },
        birth_date: {
            type: [ 'string', 'null' ]
        },
        weight: {
            type: [ 'number', 'null' ]
        },
        allergy: {
            type: [ 'string', 'null' ]
        },
        food: {
            type: [ 'string', 'null' ]
        }
    },
    required: [ 'animal_id', 'breed', 'species', 'gender', 'color', 'birth_date', 'weight', 'allergy', 'food' ]
}

export const AnimalDetailsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    defaultProperties: [],
    ...properties
};

export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>

export const isAnimalDetails = ajv.compile(AnimalDetailsSchema) as ValidateFunction<AnimalDetails>;

export default function validate(value: unknown): AnimalDetails {
    if (isAnimalDetails(value)) {
        return value;
    }

    const errors = isAnimalDetails.errors!.filter((e: any) => e.keyword !== 'if');

    throw new Error(`${ajv.errorsText(errors, { dataVar: 'AnimalDetails' })} \n ${inspect(value)}`);
}
