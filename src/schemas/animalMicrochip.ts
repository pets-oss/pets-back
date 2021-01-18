import { IResolvers } from 'graphql-tools';
import { getAnimalMicrochipsQuery, getAnimalsMicrochipsQuery } from '../sql-queries/animalMicrochip';

const typeDef = `
extend type Query {
  """
    Lookup an animal microchip info.
  
    Examples:
  
    animal_microchips(animal_id: 1)
  """
  animal_microchips(
    "Animal id in database"
    animal_id: Int!) : [AnimalMicrochip]

  """
    Get all animals microchips.
  
    Examples:
  
    animals_microchips
  """
  animals_microchips : [AnimalMicrochip]
  }
  
"Represents an animal microchip."
type AnimalMicrochip {
  "Animal id, for example 2"
  animal_id: Int!
  "Microchip id"
  microchip_id: String!
  "Microchip install date"
  chip_install_date: String
  "Microchip status ('Implanted' or 'Removed')"
  status: String
}`;

const resolvers: IResolvers = {
    Query: {
        animals_microchips: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalsMicrochipsQuery());
            return dbResponse.rows;
        },
        animal_microchips: async (_, { animal_id }, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalMicrochipsQuery(animal_id));
            return dbResponse.rows;
        },
    },
};

export { typeDef, resolvers };

