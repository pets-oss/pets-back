import { IResolvers } from 'graphql-tools';
import getGendersQuery from '../sql-queries/gender';

const typeDef = `
extend type Query {
  """
    Get all genders.
  
    Examples:
  
    genders(language: "lt")
  """
  genders(
    "language code"
     language: String!) : [Gender]
}

"Represents a gender."
type Gender {
  "Gender id"
  id: Int!
  "Gender name"
  value: String!
}`;

const resolvers: IResolvers = {
    Query: {
        genders: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getGendersQuery(language));
            return dbResponse.rows;
        },
    },
};

export { typeDef, resolvers };
