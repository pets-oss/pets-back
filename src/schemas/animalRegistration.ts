const animalRegistrationTypeDef = `
"Animal registration status valid values"
enum RegistrationStatus { Active, Implanted }

"Represents an animal registration."
type AnimalRegistration {
  "Animal id, for example 2"
  animalId: Int!
  "Registration number"
  registrationNo: String!
  "Registration date"
  registrationDate: String
  "Registration status ('Active' or 'Inactive')"
  status: RegistrationStatus
}`;

export default animalRegistrationTypeDef;

