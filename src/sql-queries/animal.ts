import { QueryConfig } from 'pg';
import { insert, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';
import { AnimalRegistrationInput } from './animalRegistration';

const table = 'animal';
const returnFields =
  'id, name, organization, status, image_url, comments, mod_time';

interface CreateAnimalInput {
  name: String;
  organization: number;
  status: String;
  image_url: String;
  comments: String;
  registration: AnimalRegistrationInput;
}

interface UpdateAnimalInput {
  id: number;
  name: String;
  organization: number;
  status: String;
  image_url: String;
  comments: String;
  registration: AnimalRegistrationInput;
}

export const getAnimalQuery = (id: number): QueryConfig => {
  const text = `SELECT
                    id,
                    name,
                    organization,
                    status,
                    image_url,
                    comments,
                    mod_time
                FROM public.animal
                WHERE id = $1;`;

  const query = {
    text,
    values: [id],
  };

  return query;
};

export const getAnimalsQuery = (): QueryConfig => {
  const text = `SELECT
                    id,
                    name,
                    organization,
                    status,
                    image_url,
                    comments,
                    mod_time
                FROM public.animal;`;

  const query = {
    text,
  };

  return query;
};

export const createAnimalQuery = (input: CreateAnimalInput): QueryConfig => {
  const { registration, ...animal } = input;
  return insert(table, snakeCaseKeys(animal)).returning(returnFields).toParams();
};

export const updateAnimalQuery = (input: UpdateAnimalInput): QueryConfig => {
  const { registration, ...animal } = input;
  return update(table, snakeCaseKeys(animal))
    .where({ id: input.id })
    .returning(returnFields)
    .toParams();
};
