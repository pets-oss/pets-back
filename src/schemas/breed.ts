import { IResolvers } from 'graphql-tools';
import getBreedsQuery from "../sql-queries/breed";

const typeDef = `
extend type Query {
  """
    Get all breeds.
  
    Examples:
  
    breeds(language: "lt", species: "2")
  """
  breeds(
    "language code"
     language: String!,
     "species id"
     species: String!) : [Breed]
}

"Represents a breed."
type Breed {
  "Breed id"
  id: String!
  "Breed code"
  code: String!
  "Breed name"
  value: String!
}`;

const resolvers: IResolvers = {
    Query: {
        breeds: async (_, { language, species }, { pgClient }) => {
            const dbResponse = await pgClient.query(getBreedsQuery(language, species));
            return dbResponse.rows;
        },
    },
};

export { typeDef, resolvers };
