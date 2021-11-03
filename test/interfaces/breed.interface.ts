export default interface Breed {
    id: number;
    abbreviation: string;
    value: string;
    speciesId?: number | null;
    speciesValue?: string | null;
}
