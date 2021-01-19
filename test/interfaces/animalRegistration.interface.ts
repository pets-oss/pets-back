export default interface AnimalRegistration {
    animal_id: number,
    registration_no: string,
    registration_date: string | null,
    status: RegistrationStatus
}

enum RegistrationStatus { 'Active', 'Inactive' }
