export default interface AnimalMicrochip {
    animal_id: number,
    microchip_id: string,
    install_date: string | null,
    status: MicrochipStatus
}

enum MicrochipStatus { 'Implanted', 'Removed' }
