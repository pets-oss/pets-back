import { QueryConfig } from 'pg';

interface CreateAnimalInput {
  name: String;
  organization: number;
  status: String;
  image_url: String;
  comments: String;
}

interface UpdateAnimalInput {
  id: number;
  name: String;
  organization: number;
  status: String;
  image_url: String;
  comments: String;
}

interface DeleteAnimalInput {
  id: number;
}

export const getAnimalQuery = (id: number): QueryConfig => {
  const text = `SELECT
                    id,
                    name,
                    organization,
                    status,
                    image_url,
                    comments,
                    mod_time,
                    del_time
                FROM public.animal
                WHERE
                    del_time IS NULL
                    AND id = $1;`;

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
                    mod_time,
                    del_time
                FROM public.animal
                WHERE del_time IS NULL;`;

  const query = {
    text,
  };

  return query;
};

export const createAnimalQuery = (input: CreateAnimalInput): QueryConfig => {
  const text = `INSERT INTO animal
                 (name,
                  organization,
                  status,
                  image_url,
                  comments)
                VALUES
                 ($1,
                  $2,
                  $3,
                  $4,
                  $5)
                RETURNING
                  id,
                  name,
                  organization,
                  status,
                  image_url,
                  comments,
                  mod_time,
                  del_time;`;

  const query = {
    text,
    values: [
      input.name,
      input.organization,
      input.status,
      input.image_url,
      input.comments,
    ],
  };

  return query;
};

export const updateAnimalQuery = (input: UpdateAnimalInput): QueryConfig => {
  const text = `UPDATE animal SET
                  name = $1,
                  organization = $2,
                  status = $3,
                  image_url = $4,
                  comments = $5
                WHERE
                  del_time IS NULL
                  AND id = $6
                RETURNING
                  id,
                  name,
                  organization,
                  status,
                  image_url,
                  comments,
                  mod_time,
                  del_time;`;

  const query = {
    text,
    values: [
      input.name,
      input.organization,
      input.status,
      input.image_url,
      input.comments,
      input.id,
    ],
  };

  return query;
};

export const markAnimalDeletedQuery = (input: DeleteAnimalInput): QueryConfig => {
  const text = `UPDATE animal SET
                  del_time = CURRENT_TIMESTAMP
                WHERE id = $1
                RETURNING
                  id,
                  name,
                  organization,
                  status,
                  image_url,
                  comments,
                  mod_time,
                  del_time;`;

  const query = {
    text,
    values: [input.id],
  };

  return query;
};
