import { IResolvers } from 'graphql-tools';
import { getAnimalRegistrationsQuery, getAnimalsRegistrationsQuery } from '../sql-queries/animalRegistration';

const typeDef = `
extend type Query {
  """
    Lookup an animal registration info.
  
    Examples:
  
    animal_registrations(animal_id: 1)
  """
  animal_registrations(
    "Animal id in database"
    animal_id: Int!) : [AnimalRegistration]

  """
    Get all animals registrations.
  
    Examples:
  
    animals_registrations
  """
  animals_registrations : [AnimalRegistration]
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

const query = `
"""
  Lookup an animal registrations.
  
  Examples:
  
  animal_registrations(id: 1)
"""
  animal_registrations(
    "Animal id in database"
    animal_id: Int!) : [AnimalRegistration]
`;

const resolvers: IResolvers = {
    Query: {
        animals_registrations: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalsRegistrationsQuery());
            return dbResponse.rows;
        },
        animal_registrations: async (_, { animal_id }, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalRegistrationsQuery(animal_id));
            return dbResponse.rows;
        },
    },
};

export { typeDef, resolvers, query };

