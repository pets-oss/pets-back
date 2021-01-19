import { IResolvers } from 'graphql-tools';
import { getBreedsQuery } from '../sql-queries/breed';

const typeDef = `
extend type Query {
  """
    Get all breeds.
  
    Examples:
  
    breeds(species: "2", language: "lt")
  """
  breeds(
    "breed species"
    species: String!
    "language code"
    language: String!) : [Breed]
}

"Represents a breed."
type Breed {
  "Breed id"
  id: Int!
  "Breed code"
  code: String!
  "Breed name"
  value: String!
}`;

const resolvers: IResolvers = {
    Query: {
        breeds: async (_, { species, language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getBreedsQuery(species, language));
            return dbResponse.rows;
        },
    }
};

export { typeDef, resolvers };
