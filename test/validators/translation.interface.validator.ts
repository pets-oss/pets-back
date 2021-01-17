import { inspect } from 'util';
import Ajv from 'ajv';
import Translation from '../interfaces/translation.interface';

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
            type: [ 'number', 'string' ]
        },
        value: {
            type: 'string'
        }
    },
    required: [ 'id', 'value' ],
    type: 'object'
};

export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isBreedTranslation = ajv.compile(BreedSchema) as ValidateFunction<Translation>;

export default function validate(value: unknown): Translation {
    if (isBreedTranslation(value)) {
        return value;
    }

    const errors = isBreedTranslation.errors!.filter((e: any) => e.keyword !== 'if');

    throw new Error(`${ajv.errorsText(errors, { dataVar: 'Translation' })} \n ${inspect(value)}`);
}
