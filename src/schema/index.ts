import { addResolversToSchema, loadSchemaSync } from 'graphql-tools';
import { merge } from 'lodash';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

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
import uploadResolver from './resolvers/upload';
import chipCompanyResolvers from './resolvers/chipCompany';
import organizationTaskResolvers from './resolvers/organizationTask';
import municipalityResolvers from './resolvers/municipality';
import animalOwnerResolvers from './resolvers/animalOwner';
import dateResolvers from './resolvers/date';
import chipInstallPlaceTranslationResolvers
    from './resolvers/chipInstallPlaceTranslation';
import streetfindEventResolvers from './resolvers/eventStreetfind';
import handOverEventResolvers from './resolvers/eventHandOver';
import favoriteAnimalResolvers from './resolvers/favoriteAnimal';
import customScalarsResolvers from './resolvers/scalars';

const schema = loadSchemaSync('src/schema/typeDefs/*.graphql', {
    loaders: [new GraphQLFileLoader()],
});
const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers: merge(
        customScalarsResolvers,
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
        eventResolvers,
        uploadResolver,
        chipCompanyResolvers,
        organizationTaskResolvers,
        municipalityResolvers,
        animalOwnerResolvers,
        dateResolvers,
        chipInstallPlaceTranslationResolvers,
        streetfindEventResolvers,
        handOverEventResolvers,
        favoriteAnimalResolvers,
    ),
    inheritResolversFromInterfaces: true,
});

export default schemaWithResolvers;
