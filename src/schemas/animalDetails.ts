import { IResolvers } from 'graphql-tools';
import { getAnimalDetailsQuery, getAnimalsDetailsQuery } from '../sql-queries/animalDetails';
import { getGenderQuery } from '../sql-queries/gender';
import { getBreedQuery } from '../sql-queries/breed';
import { getSpeciesByBreedIdQuery } from '../sql-queries/species';
import { getColorQuery } from '../sql-queries/color';

const defaultLanguage = 'lt';

const typeDef = `
extend type Query {
  """
    Lookup an animal details.
  
    Examples:
  
    animalDetails(animal_id: 1)
  """
  animalDetails(
    "Animal id in database"
    animal_id: Int!
    language: String = "lt") : AnimalDetails

  """
    Get all animals details.
  
    Examples:
  
    animals_details
  """
  animalsDetails : [AnimalDetails]
  }
  
"Represents an animal details."
type AnimalDetails {
  "Animal id, for example 2"
  animal_id: Int!
  """
  Animal breed by language.
  Examples: breed(language: "en") or just breed - will return default language ("${defaultLanguage}") translation
  """
  breed (language: String = "${defaultLanguage}"): String
  """
  Animal species by language
  Examples: species(language: "ec") or just species - will return default language ("${defaultLanguage}") translation
  """
  species (language: String = "${defaultLanguage}"): String
  """
  Animal gender by language. 
  Examples: gender(language: "en") or just gender - will return default language ("${defaultLanguage}") translation
  """
  gender (language: String = "${defaultLanguage}"): String,
  """
  Animal color by language
  Examples: color(language: "en") or just color - will return default language ("${defaultLanguage}") translation
  """
  color (language: String = "${defaultLanguage}"): String
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
        animalsDetails: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalsDetailsQuery());
            return dbResponse.rows;
        },
        animalDetails: async (_, { animal_id }, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalDetailsQuery(animal_id));
            return dbResponse.rows[0];
        },
    },
    AnimalDetails: {
        gender: async ({ gender } , { language }, { pgClient }) => {
            let dbResponse = await pgClient.query(getGenderQuery(gender, language));

            if (!dbResponse.rows[0]) {
                dbResponse = await pgClient.query(getGenderQuery(gender, defaultLanguage));
            }

            return dbResponse.rows[0].gender;
        },
        breed: async ({ breed_id }, { language }, { pgClient }) => {
            let dbResponse = await pgClient.query(getBreedQuery(breed_id, language));

            if (!dbResponse.rows[0]) {
                dbResponse = await pgClient.query(getBreedQuery(breed_id, defaultLanguage));
            }

            return dbResponse.rows[0].breed;
        },
        species: async ({ breed_id }, { language }, { pgClient }) => {
            let dbResponse = await pgClient.query(getSpeciesByBreedIdQuery(breed_id, language));

            if (!dbResponse.rows[0]) {
                dbResponse = await pgClient.query(getSpeciesByBreedIdQuery(breed_id, defaultLanguage));
            }

            return dbResponse.rows[0].species;
        },
        color: async ({ color }, { language }, { pgClient }) => {
            let dbResponse = await pgClient.query(getColorQuery(color, language));

            if (!dbResponse.rows[0]) {
                dbResponse = await pgClient.query(getColorQuery(color, defaultLanguage));
            }

            return dbResponse.rows[0].color;
        }
    }
};

export { typeDef, resolvers };
