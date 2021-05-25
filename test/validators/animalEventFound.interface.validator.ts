/* tslint:disable */
// generated by typescript-json-validator
import { inspect } from 'util';
import Ajv = require('ajv');
import AnimalEventFound from '../interfaces/animalEventFound.interface';
export const ajv = new Ajv({
    allErrors: true,
    coerceTypes: false,
    format: 'fast',
    nullable: true,
    unicode: true,
    uniqueItems: true,
    useDefaults: true,
});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export { AnimalEventFound };
export const AnimalEventFoundSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    defaultProperties: [],
    properties: {
        animalId: {
            type: 'number',
        },
        author: {
            type: 'string',
        },
        comments: {
            type: ['null', 'string'],
        },
        date: {
            type: ['null', 'string'],
        },
        houseNo: {
            type: ['null', 'string'],
        },
        id: {
            type: 'number',
        },
        municipalityId: {
            type: 'number',
        },
        street: {
            type: 'string',
        },
    },
    required: [
        'animalId',
        'author',
        'comments',
        'date',
        'houseNo',
        'id',
        'municipalityId',
        'street',
    ],
    type: 'object',
};
export type ValidateFunction<T> = ((data: unknown) => data is T) &
    Pick<Ajv.ValidateFunction, 'errors'>;
export const isAnimalEventFound = ajv.compile(
    AnimalEventFoundSchema
) as ValidateFunction<AnimalEventFound>;
export default function validate(value: unknown): AnimalEventFound {
    if (isAnimalEventFound(value)) {
        return value;
    } else {
        throw new Error(
            ajv.errorsText(
                isAnimalEventFound.errors!.filter(
                    (e: any) => e.keyword !== 'if'
                ),
                { dataVar: 'AnimalEventFound' }
            ) +
                '\n\n' +
                inspect(value)
        );
    }
}
