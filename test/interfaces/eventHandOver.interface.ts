import Author from './author.interface';

export default interface EventHandOver {
    id: number;
    formerOwnerId: number;
    date: string | null;
    animalId: number;
    reason: string | null;
    author: Author;
}
