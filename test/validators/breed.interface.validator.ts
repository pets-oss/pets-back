import { inspect } from 'util';
import Ajv from 'ajv';
import Breed from '../interfaces/breed.interface';

export const ajv = new Ajv({
    allErrors: true,
    coerceTypes: false,
    format: 'fast',
    nullable: true,
    unicode: true,
    uniqueItems: true,
    useDefaults: true
});

export const BreedSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    defaultProperties: [],
    properties: {
        id: {
            type: 'number'
        },
        code: {
            type: 'string'
        },
        value: {
            type: 'string'
        },
        species: {
            type: 'string'
        }
    },
    required: [ 'id', 'code', 'value', 'species' ],
    type: 'object'
};

export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isBreed = ajv.compile(BreedSchema) as ValidateFunction<Breed>;

export default function validate(value: unknown): Breed {
    if (isBreed(value)) {
        return value;
    }

    const errors = isBreed.errors!.filter((e: any) => e.keyword !== 'if');

    throw new Error(`${ajv.errorsText(errors, { dataVar: 'Breed' })} \n ${inspect(value)}`);
}
