import Author from './author.interface';

export default interface EventGiveaway {
    id: number;
    registrationDate: string | null;
    registrationNo: string | null;
    formerOwnerId: number;
    date: string | null;
    animalId: number;
    reason: string | null;
    author: Author;
}
