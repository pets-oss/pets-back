import { IResolvers } from 'graphql-tools';
import { GraphQLUpload } from 'graphql-upload';

const resolvers: IResolvers = {
    Upload: GraphQLUpload,
};

export default resolvers;
