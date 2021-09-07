import Author from './author.interface';

enum EventGroup {
    General = 'General',
    Medical = 'Medical'
}

enum EventType {
    Giveaway = 'Giveaway',
    Streetfind = 'Streetfind',
    CheckIn = 'CheckIn',
    CheckOut = 'CheckOut',
    Died = 'Died',
    TemporaryCare = 'TemporaryCare',
    Microchipping = 'Microchipping',
    LocationChange = 'LocationChange',
    Medication = 'Medication',
    Prophylaxis = 'Prophylaxis',
    Surgery = 'Surgery',
    GenderElimination = 'GenderElimination',
    Inspection = 'Inspection'
}

export default interface Event {
    id: number,
    animalId: number,
    group: EventGroup,
    type: EventType,
    dateTime: string | null,
    createTime: string | null,
    author: Author | null,
    details: any | null,
}
