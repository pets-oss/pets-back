import { IResolvers } from 'graphql-tools';
import { getColorsQuery } from '../sql-queries/color';

const typeDef = `
extend type Query {
  """
    Get all colors.
  
    Examples:
  
    colors(language: "lt")
  """
  colors(
    "language code"
     language: String!) : [Gender]
}

"Represents a color."
type Color {
  "Color id"
  id: Int!
  "Color name"
  value: String!
}`;

const resolvers: IResolvers = {
    Query: {
        colors: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getColorsQuery(language));
            return dbResponse.rows;
        },
    },
};

export { typeDef, resolvers };
