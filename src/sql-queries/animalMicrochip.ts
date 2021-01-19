import { QueryConfig } from 'pg';

export const getAnimalMicrochipsQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    microchip_id,
                    install_date,
                    status
                FROM public.animal_microchip
                WHERE animal_id = $1;`;

    const query = {
        text,
        values: [id],
    };

    return query;
};

export const getAnimalsMicrochipsQuery = (): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    microchip_id,
                    install_date,
                    status
                FROM public.animal_microchip;`;

    const query = {
        text,
    };

    return query;
};

export const getImplantedAnimalMicrochipQuery = (id: number): QueryConfig => {
    const text = `SELECT
                    animal_id,
                    microchip_id,
                    install_date,
                    status
                FROM public.animal_microchip
                WHERE animal_id = $1
                AND status = 'Implanted';`;

    const query = {
        text,
        values: [id],
    };

    return query;
};
