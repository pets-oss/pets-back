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
const resolvers = {};
const schema = makeExecutableSchema({
  typeDefs: [query, animalTypeDef],
  resolvers: merge(resolvers, animalResolvers),
});

export { schema };
