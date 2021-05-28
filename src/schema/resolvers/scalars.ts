import { IResolvers } from 'graphql-tools';
import { nameScalar, surnameScalar, phoneScalar} from '../scalars/scalars';

const resolvers: IResolvers = {
    Name: nameScalar,
    Surname: surnameScalar,
    Phone: phoneScalar,
};

export default resolvers;
