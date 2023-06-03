import Author from './author.interface';

export default interface MedicationEvent {
    id: number
    animalId: number
    dateTime: string | null
    comments: string | null
    treatment: string
    expenses: number | null
    author: Author
}
