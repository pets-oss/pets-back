import { IResolvers } from 'graphql-tools';
import {
  getAnimalQuery,
  getAnimalsQuery,
  createAnimalQuery,
  updateAnimalQuery,
} from '../sql-queries/animal';
import getAnimalDetailsQuery from '../sql-queries/animalDetails';
import getActiveAnimalRegistrationQuery from '../sql-queries/animalRegistration';
import getImplantedAnimalMicrochipQuery from '../sql-queries/animalMicrochip';

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
  "Animal name"
  name: String
  "Organization id"
  organization: Int!
  "Status"
  status: String
  "Image URL"
  imageUrl: String
  "Comments"
  comments: String
  "Modification time"
  modTime: String

  "Animal active registration info"
  registration: AnimalRegistration
  "Animal implanted microchip info"
  microchip: AnimalMicrochip
  "Animal details"
  details: AnimalDetails
}

extend type Mutation {
  "Created animal"
  createAnimal(input: CreateAnimalInput!): Animal
  "Updated animal"
  updateAnimal(input: UpdateAnimalInput!): Animal
}

input CreateAnimalInput {
  "Animal name"
  name: String
  "Organization id"
  organization: Int!
  "Status"
  status: String
  "Image URL"
  image_url: String
  "Comments"
  comments: String
}

input UpdateAnimalInput {
  "Animal id, for example 2"
  id: Int!
  "Animal name"
  name: String!
  "Organization id"
  organization: Int!
  "Status"
  status: String!
  "Image URL"
  image_url: String!
  "Comments"
  comments: String!
}
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
  Mutation: {
    createAnimal: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(createAnimalQuery(input));

      return dbResponse.rows[0];
    },
    updateAnimal: async (_, { input }, { pgClient }) => {
      const dbResponse = await pgClient.query(updateAnimalQuery(input));

      return dbResponse.rows[0];
    },
  },
  Animal: {
    details: async ({ id }, __, { pgClient }) => {
      const dbResponse = await pgClient.query(getAnimalDetailsQuery(id));
      return dbResponse.rows[0];
    },
    registration: async ({ id }, __, { pgClient }) => {
      const dbResponse = await pgClient.query(
        getActiveAnimalRegistrationQuery(id)
      );
      return dbResponse.rows[0];
    },
    microchip: async ({ id }, __, { pgClient }) => {
      const dbResponse = await pgClient.query(
        getImplantedAnimalMicrochipQuery(id)
      );
      return dbResponse.rows[0];
    },
  },
};

export { typeDef, resolvers };
