import Author from './author.interface';

export default interface EventRescue {
    id: number;
    street: string;
    houseNo: string | null;
    municipalityId: number;
    date: string | null;
    animalId: number;
    comments: string | null;
    author: Author;
}
