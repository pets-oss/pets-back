const animalMicrochipTypeDef = `
"Animal microchip status valid values"
enum MicrochipStatus { Implanted, Removed }

"Represents an animal microchip."
type AnimalMicrochip {
  "Animal id, for example 2"
  animal_id: Int!
  "Microchip id"
  microchip_id: String!
  "Microchip install date"
  install_date: String
  "Microchip status ('Implanted' or 'Removed')"
  status: MicrochipStatus
}`;

export default animalMicrochipTypeDef;

