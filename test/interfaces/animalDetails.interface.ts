import Translation from './translation.interface';

export default interface AnimalDetails {
    animalId: number;
    breed: Translation | null;
    species: Translation | null;
    gender: Translation | null;
    color: Translation | null;
    birthDate: string | null;
    weight: number | null;
    allergy: string | null;
    food: string | null;
}
