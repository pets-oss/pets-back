import Translation from './translation.interface';
import Breed from './breed.interface';

export default interface AnimalDetails {
    animalId: number;
    breed: Breed | null;
    species: Translation | null;
    gender: Translation | null;
    color: Translation | null;
    birthDate: string | null;
    weight: number | null;
    allergy: string | null;
    food: string | null;
}
