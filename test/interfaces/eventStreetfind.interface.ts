import Author from './author.interface';

export default interface EventStreetfind {
    id: number;
    registrationDate: string;
    registrationNo: string;
    street: string;
    houseNo: string | null;
    municipalityId: number;
    date: string | null;
    animalId: number;
    comments: string | null;
    author: Author;
}
