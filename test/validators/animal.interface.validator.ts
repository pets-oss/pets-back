/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import Animal from '../interfaces/animal.interface';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {Animal};
export const AnimalSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "definitions": {
    "default": {
      "defaultProperties": [
      ],
      "properties": {
        "allergy": {
          "type": [
            "null",
            "string"
          ]
        },
        "animal_id": {
          "type": "number"
        },
        "birth_date": {
          "type": [
            "null",
            "string"
          ]
        },
        "breed": {
          "type": [
            "null",
            "string"
          ]
        },
        "color": {
          "type": [
            "null",
            "string"
          ]
        },
        "food": {
          "type": [
            "null",
            "string"
          ]
        },
        "gender": {
          "type": [
            "null",
            "string"
          ]
        },
        "species": {
          "type": [
            "null",
            "string"
          ]
        },
        "weight": {
          "type": [
            "null",
            "number"
          ]
        }
      },
      "required": [
        "allergy",
        "animal_id",
        "birth_date",
        "breed",
        "color",
        "food",
        "gender",
        "species",
        "weight"
      ],
      "type": "object"
    },
    "default_1": {
      "defaultProperties": [
      ],
      "properties": {
        "animal_id": {
          "type": "number"
        },
        "registration_date": {
          "type": [
            "null",
            "string"
          ]
        },
        "registration_no": {
          "type": "string"
        },
        "status": {
          "type": [
            "null",
            "string"
          ]
        }
      },
      "required": [
        "animal_id",
        "registration_date",
        "registration_no",
        "status"
      ],
      "type": "object"
    },
    "default_2": {
      "defaultProperties": [
      ],
      "properties": {
        "animal_id": {
          "type": "number"
        },
        "install_date": {
          "type": [
            "null",
            "string"
          ]
        },
        "microchip_id": {
          "type": "string"
        },
        "status": {
          "type": [
            "null",
            "string"
          ]
        }
      },
      "required": [
        "animal_id",
        "install_date",
        "microchip_id",
        "status"
      ],
      "type": "object"
    }
  },
  "properties": {
    "comments": {
      "type": [
        "null",
        "string"
      ]
    },
    "details": {
      "$ref": "#/definitions/default"
    },
    "id": {
      "type": "number"
    },
    "image_url": {
      "type": [
        "null",
        "string"
      ]
    },
    "microchip": {
      "$ref": "#/definitions/default_2"
    },
    "mod_time": {
      "type": [
        "null",
        "string"
      ]
    },
    "name": {
      "type": [
        "null",
        "string"
      ]
    },
    "organization": {
      "type": "number"
    },
    "registration": {
      "$ref": "#/definitions/default_1"
    },
    "status": {
      "type": [
        "null",
        "string"
      ]
    }
  },
  "required": [
    "comments",
    "details",
    "id",
    "image_url",
    "microchip",
    "mod_time",
    "name",
    "organization",
    "registration",
    "status"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isAnimal = ajv.compile(AnimalSchema) as ValidateFunction<Animal>;
export default function validate(value: unknown): Animal {
  if (isAnimal(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isAnimal.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'Animal'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
