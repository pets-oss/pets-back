import { IResolvers } from 'graphql-tools';
import { getBreedsQuery } from '../sql-queries/breed';
import { getSpeciesByBreedIdQuery } from '../sql-queries/species';

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
  "Breed code"
  code: String!
  "Translation language"
  language: String!
  "Breed name"
  value: String!
  "Species"
  species: String
}`;

const resolvers: IResolvers = {
    Query: {
        breeds: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getBreedsQuery(language));
            return dbResponse.rows;
        },
    },
    Breed: {
        species: async ({ id, language }, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getSpeciesByBreedIdQuery(id, language));
            return dbResponse.rows[0].species;
        }
    }
};

export { typeDef, resolvers };
