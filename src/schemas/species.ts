import { IResolvers } from 'graphql-tools';
import { getSpeciesQuery } from '../sql-queries/species';

const typeDef = `
extend type Query {
  """
    Get all species.
  
    Examples:
  
    species(language: "lt")
  """
  species(
    "language code"
     language: String!) : [Species]
}

"Represents a breed."
type Species {
  "Species id"
  id: String!
  "Species name"
  value: String!
}`;

const resolvers: IResolvers = {
    Query: {
        species: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getSpeciesQuery(language));
            return dbResponse.rows;
        },
    },
};

export { typeDef, resolvers };
