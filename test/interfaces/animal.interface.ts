import AnimalDetails from './animalDetails.interface';
import AnimalMicrochip from './animalMicrochip.interface';
import AnimalRegistration from './animalRegistration.interface';

export default interface Animal {
  id: number,
  organization: number,
  name: string | null,
  details: AnimalDetails,
  registration: AnimalRegistration,
  microchip: AnimalMicrochip,
  status: string | null,
  imageUrl: string | null,
  comments: string | null,
  modTime: string | null,
}
