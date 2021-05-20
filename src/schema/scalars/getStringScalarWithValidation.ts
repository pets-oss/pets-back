import { GraphQLScalarType, Kind } from 'graphql';

interface Config {
    name: string,
    max?: number,
    pattern?: RegExp
}

const validate = (value: unknown, config: Config) => {
    if (typeof value !== 'string') {
        throw new Error(`${config.name} should be a string`);
    }
    if (config.max != null && value.length > config.max) {
        throw new Error(`${config.name} max length is ${config.max}`);
    }
    if (config.pattern && !config.pattern.test(value)) {
        throw new Error(`${config.name} does not match patter config pattern`);
    }
    return value;
};

const getStringScalarWithValidation = (config: Config) =>
    (new GraphQLScalarType({
        name: config.name,
        description: `${config.name} scalar is string${
            config.max ? ` maxLength: ${config.max}` : ''
        }${config.pattern ? ` pattern: ${config.pattern}` : ''}`,

        serialize(value: string) {
            return value;
        },
        parseValue(value: unknown) {
            return validate(value, config);
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return validate(ast.value, config);
            }
            throw new Error('Value must be a string');
        }
    }));

export default getStringScalarWithValidation;
