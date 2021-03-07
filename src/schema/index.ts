import {
    mergeSchemas,
    makeExecutableSchema,
    loadSchemaSync,
} from 'graphql-tools';
import { merge } from 'lodash';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import {
    constraintDirective,
    constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive';
import animalResolvers from './resolvers/animal';
import animalDetailsResolvers from './resolvers/animalDetails';
import genderResolvers from './resolvers/gender';
import statusResolvers from './resolvers/status';
import breedResolvers from './resolvers/breed';
import speciesResolvers from './resolvers/species';
import colorResolvers from './resolvers/color';
import animalMicrochipResolvers from './resolvers/animalMicrochip';
import animalRegistrationResolvers from './resolvers/animalRegistration';
import organizationResolvers from './resolvers/organization';
import userResolvers from './resolvers/user';
import eventResolvers from './resolvers/event';

const schemaLocal = loadSchemaSync('src/schema/typeDefs/*.graphql', {
    loaders: [new GraphQLFileLoader()],
});

const schemaConstraint = makeExecutableSchema({
    typeDefs: constraintDirectiveTypeDefs,
    schemaTransforms: [constraintDirective()],
});

const schema = mergeSchemas({
    schemas: [schemaLocal, schemaConstraint],
    resolvers: merge(
        animalResolvers,
        animalDetailsResolvers,
        animalMicrochipResolvers,
        animalRegistrationResolvers,
        genderResolvers,
        statusResolvers,
        breedResolvers,
        speciesResolvers,
        colorResolvers,
        organizationResolvers,
        userResolvers,
        eventResolvers
    ),
});

export default schema;
