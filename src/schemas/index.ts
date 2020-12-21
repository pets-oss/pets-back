import { makeExecutableSchema } from 'graphql-tools';

import { merge } from 'lodash';
import {
  typeDef as animalTypeDef,
  resolvers as animalResolvers,
} from './animal';

const query = `
    type Query {
      _empty: String
    }
  `;

const schema = makeExecutableSchema({
  typeDefs: [query, animalTypeDef],
  resolvers: merge(animalResolvers),
});

export default schema;
