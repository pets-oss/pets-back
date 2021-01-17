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
  image_url: string | null,
  comments: string | null,
  mod_time: string | null,
}
