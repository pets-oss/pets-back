import { IResolvers } from 'graphql-tools';
import {
    emailScalar,
    nameScalar,
    phoneScalar,
    surnameScalar
} from '../scalars/scalars';

const resolvers: IResolvers = {
    Name: nameScalar,
    Surname: surnameScalar,
    Phone: phoneScalar,
    Email: emailScalar,
};

export default resolvers;
