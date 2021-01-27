export default interface AnimalRegistration {
    animalId: number,
    registrationNo: string,
    registrationDate: string | null,
    status: RegistrationStatus
}

enum RegistrationStatus { 'Active', 'Inactive' }
