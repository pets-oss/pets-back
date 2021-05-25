import { IResolvers } from 'graphql-tools';
import dateScalar from '../scalars/Date';

const resolvers: IResolvers = {
    Date: dateScalar,
};

export default resolvers;
