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
  "Registration number"
  registration_no: String!
  "Registration date"
  registration_date: String!
  "Status"
  status: String
  "Image URL"
  image_url: String
  "Birth date"
  birth_date: String
  "Name"
  name: String
  "Species"
  species: String
  "Breed"
  breed: String
  "Gender"
  gender: String
  "Color"
  color: String
  "Weight"
  weight: Float
  "Microchip id"
  microchip_id: String
  "Chip install date"
  chip_install_date: String
  "Allergy"
  allergy: String
  "Food"
  food: String
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
