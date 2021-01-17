import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import {
  typeDef as animalTypeDef,
  resolvers as animalResolvers,
} from './animal';

import {
  typeDef as animalDetailsTypeDef,
  resolvers as animalDetailsResolvers,
} from './animalDetails';

import {
  typeDef as animalRegistrationTypeDef,
  resolvers as animalRegistrationResolvers,
} from './animalRegistration';

import {
  typeDef as animalMicrochipTypeDef,
  resolvers as animalMicrochipResolvers,
} from './animalMicrochip';

import {
  typeDef as genderTypeDef,
  resolvers as genderResolvers,
} from './gender';

import {
  typeDef as statusTypeDef,
  resolvers as statusResolvers,
} from './status';

import {
  typeDef as breedTypeDef,
  resolvers as breedResolvers,
} from './breed';

import {
  typeDef as speciesTypeDef,
  resolvers as speciesResolvers,
} from './species';

import {
  typeDef as colorTypeDef,
  resolvers as colorResolvers,
} from './color';

const query = `
    type Query {
      _empty: String
    }
  `;

const mutation = `
    type Mutation {
      _empty: String
    }
  `;

const schema = makeExecutableSchema({
  typeDefs: [
    query,
    mutation,
    animalTypeDef,
    animalDetailsTypeDef,
    animalRegistrationTypeDef,
    animalMicrochipTypeDef,
    genderTypeDef,
    statusTypeDef,
    breedTypeDef,
    speciesTypeDef,
    colorTypeDef
  ],
  resolvers: merge(
    animalResolvers,
    animalDetailsResolvers,
    animalRegistrationResolvers,
    animalMicrochipResolvers,
    genderResolvers,
    statusResolvers,
    breedResolvers,
    speciesResolvers,
    colorResolvers
  ),
});

export default schema;
