import { IResolvers } from 'graphql-tools';
import { getAnimalMicrochipsQuery, getAnimalsMicrochipsQuery } from '../sql-queries/animalMicrochip';

const typeDef = `
extend type Query {
  """
    Lookup an animal microchip info.
  
    Examples:
  
    animalMicrochips(animal_id: 1)
  """
  animalMicrochips(
    "Animal id in database"
    animal_id: Int!) : [AnimalMicrochip]

  """
    Get all animals microchips.
  
    Examples:
  
    animalsMicrochips
  """
  animalsMicrochips : [AnimalMicrochip]
  }
  
"Represents an animal microchip."
type AnimalMicrochip {
  "Animal id, for example 2"
  animal_id: Int!
  "Microchip id"
  microchip_id: String!
  "Microchip install date"
  install_date: String
  "Microchip status ('Implanted' or 'Removed')"
  status: String
}`;

const resolvers: IResolvers = {
    Query: {
        animalsMicrochips: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalsMicrochipsQuery());
            return dbResponse.rows;
        },
        animalMicrochips: async (_, { animal_id }, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalMicrochipsQuery(animal_id));
            return dbResponse.rows;
        },
    },
};

export { typeDef, resolvers };

