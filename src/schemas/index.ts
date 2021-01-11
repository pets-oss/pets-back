import { makeExecutableSchema } from 'graphql-tools';

import { merge } from 'lodash';
import {
  typeDef as animalTypeDef,
  resolvers as animalResolvers,
} from './animal';
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
  typeDefs: [query, animalTypeDef, genderTypeDef],
  resolvers: merge(animalResolvers, genderResolvers),
});

export default schema;
