import { QueryConfig } from 'pg';

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
