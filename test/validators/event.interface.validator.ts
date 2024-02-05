/* tslint:disable */
// generated by typescript-json-validator
import { inspect } from 'util';
import { Event } from '../interfaces/event.interface';
import Ajv = require('ajv');

export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {Event};
export const EventSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "definitions": {
    "EventGroup": {
      "enum": [
        "General",
        "Medical"
      ],
      "type": "string"
    },
    "EventType": {
      "enum": [
        "Rescue",
        "Adoption",
        "Birth",
        "Death",
        "Streetfind",
        "Neutering",
        "Giveaway",
        "Inspection",
        "Medication",
        "Microchipping",
        "Prophylaxis",
        "Surgery",
        "TemporaryCare"
      ],
      "type": "string"
    },
    "default": {
      "defaultProperties": [
      ],
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": [
            "null",
            "string"
          ]
        },
        "surname": {
          "type": [
            "null",
            "string"
          ]
        }
      },
      "required": [
        "id",
        "name",
        "surname"
      ],
      "type": "object"
    }
  },
  "properties": {
    "animalId": {
      "type": "number"
    },
    "author": {
      "anyOf": [
        {
          "$ref": "#/definitions/default"
        },
        {
          "type": "null"
        }
      ]
    },
    "createTime": {
      "type": [
        "null",
        "string"
      ]
    },
    "dateTime": {
      "type": [
        "null",
        "string"
      ]
    },
    "group": {
      "$ref": "#/definitions/EventGroup"
    },
    "id": {
      "type": "number"
    },
    "type": {
      "$ref": "#/definitions/EventType"
    }
  },
  "required": [
    "animalId",
    "author",
    "createTime",
    "dateTime",
    "group",
    "id",
    "type"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isEvent = ajv.compile(EventSchema) as ValidateFunction<Event>;
export default function validate(value: unknown): Event {
  if (isEvent(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isEvent.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'Event'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
