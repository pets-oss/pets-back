import { QueryConfig } from 'pg';
import { insert, select, update } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

export interface AnimalMicrochipInput {
    animalId: number;
    microchipId: String;
    chipCompanyCode: number;
    installDate: String;
    installPlaceId: number;
    status: String;
}

const table = 'animal_microchip';
const returnFields =
    'animal_id, microchip_id, chip_company_code, install_date, install_place_id, status';

export const getImplantedAnimalMicrochipQuery = (
    animal_id: number
): QueryConfig =>
    select().from(table).where({ animal_id, status: 'Implanted' }).toParams();

export const createAnimalMicrochipQuery = (
    input: AnimalMicrochipInput
): QueryConfig =>
    insert(table, snakeCaseKeys(input)).returning(returnFields).toParams();

export const updateAnimalMicrochipQuery = (
    input: AnimalMicrochipInput
): QueryConfig =>
    update(table, snakeCaseKeys(input))
        .where({ animal_id: input.animalId, microchip_id: input.microchipId })
        .returning(returnFields)
        .toParams();

export const deleteAnimalMicrochipQuery = (
    animal_id: number,
    microchip_id: String
): QueryConfig => {
    const text = `DELETE
                FROM ${table}
                WHERE animal_id = $1
                  AND microchip_id = $2
                RETURNING
                    animal_id,
                    microchip_id,
                    chip_company_code,
                    install_date,
                    install_place_id,
                    status;`;

    const query = {
        text,
        values: [animal_id, microchip_id],
    };

    return query;
};
