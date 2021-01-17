import { inspect } from 'util';
import Ajv from 'ajv';
import Animal from '../interfaces/animal.interface';
import { properties as animalDetailsProperties } from './animalDetails.interface.validator';
import { properties as animalRegistrationProperties } from './animalRegistration.interface.validator';
import { properties as animalMicrochipProperties } from './animalMicrochip.interface.validaror';

export const ajv = new Ajv({
  allErrors: true,
  coerceTypes: false,
  format: 'fast',
  nullable: true,
  unicode: true,
  uniqueItems: true,
  useDefaults: true
});

export const AnimalSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  defaultProperties: [],
  properties: {
    id: {
      type: 'number'
    },
    organization: {
      type: 'number'
    },
    name: {
      type: [ 'string', 'null' ]
    },
    details: { ...animalDetailsProperties },
    registration: { ...animalRegistrationProperties },
    microchip: { ...animalMicrochipProperties },
    status: {
      type: [ 'string', 'null' ]
    },
    image_url: {
      type: [ 'string', 'null' ]
    },
    comments: {
      type: [ 'string', 'null' ]
    },
    mod_time: {
      type: [ 'string', 'null' ]
    }
  },
  required: [
    'id',
    'organization',
    'name',
    'details',
    'registration',
    'microchip',
    'status',
    'image_url',
    'comments',
    'mod_time',
  ],
  type: 'object'
};

export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isAnimal = ajv.compile(AnimalSchema) as ValidateFunction<Animal>;

export default function validate(value: unknown): Animal {
  if (isAnimal(value)) {
    return value;
  }

  const errors = isAnimal.errors!.filter((e: any) => e.keyword !== 'if');

  throw new Error(`${ajv.errorsText(errors, { dataVar: 'Animal' })} \n ${inspect(value)}`);
}
