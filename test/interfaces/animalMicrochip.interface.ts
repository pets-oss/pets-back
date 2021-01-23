export default interface AnimalMicrochip {
    animalId: number,
    microchipId: string,
    installDate: string | null,
    status: MicrochipStatus
}

enum MicrochipStatus { 'Implanted', 'Removed' }
