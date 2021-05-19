export default interface GivenAwayEvent {
    id: number;
    formerOwnerId: number;
    date: string | null;
    animalId: number;
    reason: string | null;
    author: string;
}
