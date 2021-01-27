import { IResolvers } from 'graphql-tools';
import { getGenderQuery } from '../sql-queries/gender';
import { getBreedQuery } from '../sql-queries/breed';
import { getSpeciesByBreedIdQuery } from '../sql-queries/species';
import { getColorQuery } from '../sql-queries/color';

const defaultLanguage: string = 'lt';

const typeDef = `
"Represents an animal details."
type AnimalDetails {
  "Animal id, for example 2"
  animalId: Int!
  """
  Animal breed by language.
  Examples: breed(language: "en") or just breed - will return default language ("${defaultLanguage}") translation
  """
  breed ("Language code" language: String = "${defaultLanguage}"): String
  """
  Animal species by language
  Examples: species(language: "en") or just species - will return default language ("${defaultLanguage}") translation
  """
  species ("Language code" language: String = "${defaultLanguage}"): String
  """
  Animal gender by language. 
  Examples: gender(language: "en") or just gender - will return default language ("${defaultLanguage}") translation
  """
  gender ("Language code" language: String = "${defaultLanguage}"): String,
  """
  Animal color by language
  Examples: color(language: "en") or just color - will return default language ("${defaultLanguage}") translation
  """
  color ("Language code" language: String = "${defaultLanguage}"): String
  "Animal date of birth"
  birthDate: String
  "Animal weight (kg)"
  weight: Float,
  "Animal allergy"
  allergy: String
  "Animal food"
  food: String
}`;

const resolvers: IResolvers = {
    AnimalDetails: {
        gender: async ({ gender } , { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getGenderQuery(gender, language, defaultLanguage));

            return dbResponse.rows[0].gender;
        },
        breed: async ({ breed_id }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getBreedQuery(breed_id, language, defaultLanguage));

            return dbResponse.rows[0].breed;
        },
        species: async ({ breed_id }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getSpeciesByBreedIdQuery(breed_id, language, defaultLanguage));

            return dbResponse.rows[0].species;
        },
        color: async ({ color }, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getColorQuery(color, language, defaultLanguage));

            return dbResponse.rows[0].color;
        }
    }
};

export { typeDef, resolvers };
