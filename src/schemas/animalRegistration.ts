const animalRegistrationTypeDef = `
"Animal registration status valid values"
enum RegistrationStatus { Implanted, Removed }

"Represents an animal registration."
type AnimalRegistration {
  "Animal id, for example 2"
  animal_id: Int!
  "Registration number"
  registration_no: String!
  "Registration date"
  registration_date: String
  "Registration status ('Active' or 'Inactive')"
  status: RegistrationStatus
}`;

export default animalRegistrationTypeDef;

