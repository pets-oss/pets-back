import { QueryConfig } from 'pg';
import { select } from 'sql-bricks-postgres';

export const getAllEventTypes = (language: string): QueryConfig =>
    select('event AS id', 'translation AS type')
        .from('event_translation')
        .where({ language })
        .toParams();

export const getEventType = (eventId: number, language: string): QueryConfig =>
    select('event AS id', 'translation AS type')
        .from('event_translation')
        .where({ language, event: eventId })
        .toParams();

export const getAllEvents = (): QueryConfig =>
    select('*', '\'GENERAL\' AS category')
        .from('animal_event_general')
        .union()
        .select('*', '\'MEDICAL\' as category')
        .from('animal_event_medical_record')
        .toParams();

export const getAllAnimalEvents = (animalId: number): QueryConfig =>
    select('*', '\'GENERAL\' AS category')
        .from('animal_event_general')
        .where({ animal: animalId })
        .union()
        .select('*', '\'MEDICAL\' as category')
        .from('animal_event_medical_record')
        .where({ animal: animalId })
        .toParams();

export const getAllGeneralEvents = (): QueryConfig =>
    select('*', '\'GENERAL\' AS category')
        .from('animal_event_general')
        .toParams();

export const getAnimalGeneralEvents = (animalId: number): QueryConfig =>
    select('*', '\'GENERAL\' AS category')
        .from('animal_event_general')
        .where({ animal: animalId })
        .toParams();

export const getAllMedicalEvents = (): QueryConfig =>
    select('*', '\'MEDICAL\' AS category')
        .from('animal_event_medical_record')
        .toParams();

export const getAnimalMedicalEvents = (animalId: number): QueryConfig =>
    select('*', '\'MEDICAL\' AS category')
        .from('animal_event_medical_record')
        .where({ animal: animalId })
        .toParams();
