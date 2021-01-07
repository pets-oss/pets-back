import { IResolvers } from 'graphql-tools';
import { getAnimalQuery, getAnimalsQuery } from '../sql-queries/animal';

const typeDef = `
extend type Query {
  """
    Lookup an animal.
  
    Examples:
  
    animal(id: 1)
  """
  animal(
    "Animal id in database"
    id: Int!) : Animal

  """
    Get all animals.
  
    Examples:
  
    animals
  """
  animals : [Animal]
  }

"Represents an animal."
type Animal {
  "Animal id, for example 2"
  id: Int!
  "Organization id"
  organization: String!
  "Status"
  status: String
  "Image URL"
  image_url: String
  "Comments"
  comments: String
  "Modification time"
  mod_time: String
}`;

const query = `
"""
  Lookup an animal.
  
  Examples:
  
  animal(id: 1)
"""
  animal(
    "Animal id in database"
    id: Int!) : Animal
`;

const resolvers: IResolvers = {
  Query: {
    animals: async (_, __, { pgClient }) => {
      const dbResponse = await pgClient.query(getAnimalsQuery());
      return dbResponse.rows;
    },
    animal: async (_, { id }, { pgClient }) => {
      const dbResponse = await pgClient.query(getAnimalQuery(id));
      return dbResponse.rows[0];
    },
  },
};

export { typeDef, resolvers, query };
