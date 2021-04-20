/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import OrganizationTask from '../interfaces/organizationTask.interface';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {OrganizationTask};
export const OrganizationTaskSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "properties": {
    "description": {
      "type": [
        "null",
        "string"
      ]
    },
    "id": {
      "type": "number"
    },
    "isDone": {
      "type": [
        "null",
        "boolean"
      ]
    },
    "organization": {
      "type": "number"
    },
    "title": {
      "type": "string"
    }
  },
  "required": [
    "description",
    "id",
    "isDone",
    "organization",
    "title"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isOrganizationTask = ajv.compile(OrganizationTaskSchema) as ValidateFunction<OrganizationTask>;
export default function validate(value: unknown): OrganizationTask {
  if (isOrganizationTask(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isOrganizationTask.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'OrganizationTask'}) +
      '\n\n' +
      inspect(value),
    );
  }
}
