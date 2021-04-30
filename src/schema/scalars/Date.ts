import { GraphQLScalarType, Kind} from 'graphql';

const validate = (value: any) => {
    const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;
    if (!(typeof value === 'string' && DATE_FORMAT.test(value))) {
        throw new Error(`Value must be a string matching YYYY-MM-DD format: ${value}`);
    }

    const isValidDate = new Date(value).toISOString().substr(0,10) === value
    if (!isValidDate) {
        throw new Error(`Value is not a valid date: ${value}`);
    }
};

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date scalar type is string matching `YYYY-MM-DD` format',
    serialize(value) {
        return new Date(value).toISOString().substr(0,10);
    },
    parseValue(value) {
        validate(value);
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            validate(ast.value);
            return ast.value;
        }
        throw new Error('Value must be a string');
    }
});

export default dateScalar;
