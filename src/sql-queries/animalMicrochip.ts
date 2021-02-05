import { QueryConfig } from 'pg';
import {insert, select, update} from "sql-bricks-postgres";
import snakeCaseKeys from 'snakecase-keys';
import {MicrochipStatus} from "../../test/interfaces/animalMicrochip.interface";

interface ImplantedAnimalMicrochipInput {
    animal_id: number;
    microchip_id: String;
    chip_company_code: number;
    install_date: String;
    install_place: number;
    status: MicrochipStatus;
}

export const getImplantedAnimalMicrochipQuery = (animal_id: number): QueryConfig =>
    select().from('animal_microchip').where({ animal_id, status: 'Implanted', delete_time: null }).toParams();

export const getDeleteTimeQuery = (animal_id: number, microchip_id: String): QueryConfig =>
    select('delete_time').from('animal_microchip').where({ animal_id, microchip_id }).toParams();

export const createImplantedAnimalMicrochipQuery = (
    input: ImplantedAnimalMicrochipInput
): QueryConfig =>
    insert('animal_microchip', snakeCaseKeys(input))
        .returning(
            'animal_id, microchip_id, chip_company_code, install_date, install_place, status, delete_time'
        )
        .toParams();

export const updateImplantedAnimalMicrochipQuery = (
    input: ImplantedAnimalMicrochipInput
): QueryConfig =>
    update('animal_microchip', snakeCaseKeys(input))
        .where({ animal_id: input.animal_id, microchip_id: input.microchip_id })
        .returning(
            'animal_id, microchip_id, chip_company_code, install_date, install_place, status, delete_time'
        )
        .toParams();

export const deleteImplantedAnimalMicrochipQuery = (animal_id: number, microchip_id: String): QueryConfig =>
    update('animal_microchip', { delete_time: 'NOW()' })
        .where({ animal_id, microchip_id })
        .returning(
            'animal_id, microchip_id, chip_company_code, install_date, install_place, status, delete_time'
        )
        .toParams();
