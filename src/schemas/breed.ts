import { IResolvers } from 'graphql-tools';
import { getBreedsQuery } from '../sql-queries/breed';

const typeDef = `
extend type Query {
  """
    Get all breeds.
  
    Examples:
  
    breeds(language: "lt")
  """
  breeds(
    "language code"
     language: String!) : [Breed]
}

"Represents a breed."
type Breed {
  "Breed id"
  id: Int!
  "Breed name"
  value: String!
}`;

const resolvers: IResolvers = {
    Query: {
        breeds: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getBreedsQuery(language));
            return dbResponse.rows;
        },
    },
};

export { typeDef, resolvers };
