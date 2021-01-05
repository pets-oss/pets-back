import { QueryConfig } from 'pg';

export const getAnimalQuery = (id: number): QueryConfig => {
  const text = `SELECT
                    id,
                    organization,
                    registration_no,
                    registration_date,
                    status,
                    image_url,
                    birth_date,
                    name,
                    species,
                    breed,
                    gender,
                    color,
                    weight,
                    microchip_id,
                    chip_install_date,
                    allergy,
                    food,
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
                    organization,
                    registration_no,
                    registration_date,
                    status,
                    image_url,
                    birth_date,
                    name,
                    species,
                    breed,
                    gender,
                    color,
                    weight,
                    microchip_id,
                    chip_install_date,
                    allergy,
                    food,
                    comments,
                    mod_time
                FROM public.animal`;

  const query = {
    text,
  };

  return query;
};
