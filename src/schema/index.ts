import { addResolversToSchema } from 'graphql-tools';
import { merge } from 'lodash';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import animalResolvers from './resolvers/animal';
import animalDetailsResolvers from './resolvers/animalDetails';
import genderResolvers from './resolvers/gender';
import statusResolvers from './resolvers/status';
import breedResolvers from './resolvers/breed';
import speciesResolvers from './resolvers/species';
import colorResolvers from './resolvers/color';

const schema = loadSchemaSync('src/schema/typeDefs/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers: merge(
    animalResolvers,
    animalDetailsResolvers,
    genderResolvers,
    statusResolvers,
    breedResolvers,
    speciesResolvers,
    colorResolvers
  ),
});

export default schemaWithResolvers;
