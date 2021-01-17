import { IResolvers } from 'graphql-tools';
import { getAnimalRegistrationsQuery, getAnimalsRegistrationsQuery } from '../sql-queries/animalRegistration';

const typeDef = `
extend type Query {
  """
    Lookup an animal registration info.
  
    Examples:
  
    animalRegistrations(animal_id: 1)
  """
  animalRegistrations(
    "Animal id in database"
    animal_id: Int!) : [AnimalRegistration]

  """
    Get all animals registrations.
  
    Examples:
  
    animalsRegistrations
  """
  animalsRegistrations : [AnimalRegistration]
  }
  
"Represents an animal registration."
type AnimalRegistration {
  "Animal id, for example 2"
  animal_id: Int!
  "Registration number"
  registration_no: String!
  "Registration date"
  registration_date: String
  "Registration status ('Active' or 'Inactive')"
  status: String
}`;

const resolvers: IResolvers = {
    Query: {
        animalsRegistrations: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalsRegistrationsQuery());
            return dbResponse.rows;
        },
        animalRegistrations: async (_, { animal_id }, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalRegistrationsQuery(animal_id));
            return dbResponse.rows;
        },
    },
};

export { typeDef, resolvers };

