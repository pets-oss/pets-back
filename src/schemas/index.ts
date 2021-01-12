import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import {
  typeDef as animalTypeDef,
  resolvers as animalResolvers,
} from './animal';

import {
  typeDef as animalDetailsTypeDef,
  resolvers as animalDetailsResolvers
} from './animal_details';

import {
  typeDef as animalRegistrationTypeDef,
  resolvers as animalRegistrationResolvers
} from './animal_registration';

import {
  typeDef as animalMicrochipTypeDef,
  resolvers as animalMicrochipResolvers
} from './animal_microchip';

import {
  typeDef as genderTypeDef,
  resolvers as genderResolvers,
} from "./gender";

const query = `
    type Query {
      _empty: String
    }
  `;

const schema = makeExecutableSchema({
  typeDefs: [query, animalTypeDef, animalDetailsTypeDef, animalRegistrationTypeDef, animalMicrochipTypeDef, genderTypeDef],
  resolvers: merge(animalResolvers, animalDetailsResolvers, animalRegistrationResolvers, animalMicrochipResolvers, genderResolvers),
});

export default schema;
