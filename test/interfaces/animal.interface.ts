import AnimalDetails from './animalDetails.interface';
import AnimalMicrochip from './animalMicrochip.interface';
import AnimalRegistration from './animalRegistration.interface';

export default interface Animal {
    id: number;
    organization: number;
    name: string | null;
    details: AnimalDetails | null;
    registration: AnimalRegistration | null;
    microchip: AnimalMicrochip | null;
    status: string | null;
    imageUrl: string | null;
    comments: string | null;
    modTime: string | null;
    isFavorite: boolean | null;
}
