import { IResolvers } from 'graphql-tools';
import { getAnimalDetailsQuery, getAnimalsDetailsQuery } from '../sql-queries/animalDetails';

const typeDef = `
extend type Query {
  """
    Lookup an animal details.
  
    Examples:
  
    animal_details(animal_id: 1)
  """
  animal_details(
    "Animal id in database"
    animal_id: Int!) : AnimalDetails

  """
    Get all animals details.
  
    Examples:
  
    animals_details
  """
  animals_details : [AnimalDetails]
  }
  
"Represents an animal details."
type AnimalDetails {
  "Animal id, for example 2"
  animal_id: Int!
  "Breed id"
  breed_id: Int
  "Animal gender"
  gender: String,
  "Animal color id"
  color: Int
  "Animal date of birth"
  birth_date: String
  "Animal weight (kg)"
  weight: Float,
  "Animal allergy"
  allergy: String
  "Animal food"
  food: String
}`;

const resolvers: IResolvers = {
    Query: {
        animals_details: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalsDetailsQuery());
            return dbResponse.rows;
        },
        animal_details: async (_, { animal_id }, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalDetailsQuery(animal_id));
            return dbResponse.rows[0];
        },
    },
};

export { typeDef, resolvers };
