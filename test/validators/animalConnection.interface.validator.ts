/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import AnimalConnection from '../interfaces/animalConnection.interface';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {AnimalConnection};
export const AnimalConnectionSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "definitions": {
    "AnimalEdge": {
      "defaultProperties": [
      ],
      "properties": {
        "cursor": {
          "type": "string"
        },
        "node": {
          "$ref": "#/definitions/default"
        }
      },
      "required": [
        "cursor",
        "node"
      ],
      "type": "object"
    },
    "default": {
      "defaultProperties": [
      ],
      "properties": {
        "comments": {
          "type": [
            "null",
            "string"
          ]
        },
        "details": {
          "$ref": "#/definitions/default_1"
        },
        "id": {
          "type": "number"
        },
        "imageUrl": {
          "type": [
            "null",
            "string"
          ]
        },
        "microchip": {
          "$ref": "#/definitions/default_5"
        },
        "modTime": {
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
          "$ref": "#/definitions/default_4"
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
        "imageUrl",
        "microchip",
        "modTime",
        "name",
        "organization",
        "registration",
        "status"
      ],
      "type": "object"
    },
    "default_1": {
      "defaultProperties": [
      ],
      "properties": {
        "allergy": {
          "type": [
            "null",
            "string"
          ]
        },
        "animalId": {
          "type": "number"
        },
        "birthDate": {
          "type": [
            "null",
            "string"
          ]
        },
        "breed": {
          "anyOf": [
            {
              "$ref": "#/definitions/default_2"
            },
            {
              "type": "null"
            }
          ]
        },
        "color": {
          "anyOf": [
            {
              "$ref": "#/definitions/default_3"
            },
            {
              "type": "null"
            }
          ]
        },
        "food": {
          "type": [
            "null",
            "string"
          ]
        },
        "gender": {
          "anyOf": [
            {
              "$ref": "#/definitions/default_3"
            },
            {
              "type": "null"
            }
          ]
        },
        "species": {
          "anyOf": [
            {
              "$ref": "#/definitions/default_3"
            },
            {
              "type": "null"
            }
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
        "animalId",
        "birthDate",
        "breed",
        "color",
        "food",
        "gender",
        "species",
        "weight"
      ],
      "type": "object"
    },
    "default_2": {
      "defaultProperties": [
      ],
      "properties": {
        "abbreviation": {
          "type": "string"
        },
        "id": {
          "type": "number"
        },
        "value": {
          "type": "string"
        }
      },
      "required": [
        "abbreviation",
        "id",
        "value"
      ],
      "type": "object"
    },
    "default_3": {
      "defaultProperties": [
      ],
      "properties": {
        "id": {
          "type": [
            "string",
            "number"
          ]
        },
        "value": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "value"
      ],
      "type": "object"
    },
    "default_4": {
      "defaultProperties": [
      ],
      "properties": {
        "registrationDate": {
          "type": [
            "null",
            "string"
          ]
        },
        "registrationNo": {
          "type": "string"
        },
        "status": {
          "type": "string"
        }
      },
      "required": [
        "registrationDate",
        "registrationNo",
        "status"
      ],
      "type": "object"
    },
    "default_5": {
      "defaultProperties": [
      ],
      "properties": {
        "animalId": {
          "type": "number"
        },
        "installDate": {
          "type": [
            "null",
            "string"
          ]
        },
        "microchipId": {
          "type": "string"
        },
        "status": {
          "type": "string"
        }
      },
      "required": [
        "animalId",
        "installDate",
        "microchipId",
        "status"
      ],
      "type": "object"
    },
    "default_6": {
      "defaultProperties": [
      ],
      "properties": {
        "endCursor": {
          "type": "string"
        },
        "hasNextPage": {
          "type": "boolean"
        },
        "hasPreviousPage": {
          "type": "boolean"
        },
        "startCursor": {
          "type": "string"
        }
      },
      "required": [
        "endCursor",
        "hasNextPage",
        "hasPreviousPage",
        "startCursor"
      ],
      "type": "object"
    }
  },
  "properties": {
    "edges": {
      "items": {
        "$ref": "#/definitions/AnimalEdge"
      },
      "type": "array"
    },
    "pageInfo": {
      "$ref": "#/definitions/default_6"
    }
  },
  "required": [
    "edges",
    "pageInfo"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isAnimalConnection = ajv.compile(AnimalConnectionSchema) as ValidateFunction<AnimalConnection>;
export default function validate(value: unknown): AnimalConnection {
  if (isAnimalConnection(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isAnimalConnection.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'AnimalConnection'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
