import { inspect } from 'util';
import Ajv from 'ajv';
import AnimalMicrochip from '../interfaces/animalMicrochip.interface';

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
        microchip_id: {
            type: [ 'string', 'null' ]
        },
        chip_install_date: {
            type: [ 'string', 'null' ]
        },
        status: {
            type: ['string', 'null']
        }
    },
    required: [ 'animal_id', 'microchip_id', 'chip_install_date', 'status' ]
}

export const AnimalMicrochipSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    defaultProperties: [],
    ...properties
};

export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>

export const isAnimalMicrochip = ajv.compile(AnimalMicrochipSchema) as ValidateFunction<AnimalMicrochip>;

export default function validate(value: unknown): AnimalMicrochip {
    if (isAnimalMicrochip(value)) {
        return value;
    }

    const errors = isAnimalMicrochip.errors!.filter((e: any) => e.keyword !== 'if');

    throw new Error(`${ajv.errorsText(errors, { dataVar: 'AnimalMicrochip' })} \n ${inspect(value)}`);
}
