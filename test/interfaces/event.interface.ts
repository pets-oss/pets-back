import Author from './author.interface';

enum EventGroup {
    General = 'General',
    Medical = 'Medical',
    Registration = 'Registration',
}

enum EventType {
    Giveaway = 'Giveaway',
    Streetfind = 'Streetfind',
    Rescue = 'Rescue',
    Birth = 'Birth',
    Adoption = 'Adoption',
    Death = 'Death',
    TemporaryCare = 'TemporaryCare',
    Microchipping = 'Microchipping',
    Medication = 'Medication',
    Prophylaxis = 'Prophylaxis',
    Surgery = 'Surgery',
    Neutering = 'Neutering',
    Inspection = 'Inspection',
}

interface Event {
    id: number,
    animalId: number,
    group: EventGroup,
    type: EventType,
    dateTime: string | null,
    createTime: string | null,
    author: Author | null,
    details: any | null,
}

interface AnimalOwner {
    id: number,
    name: string,
    surname: string,
    phone: string,
}

interface EventGiveawayDetails {
    registrationDate: string | null,
    registrationNo: string,
    formerOwner: AnimalOwner | null,
    reason: string | null,
}

interface EventGiveaway extends Event {
    id: number,
    animalId: number,
    group: EventGroup,
    type: EventType,
    dateTime: string | null,
    createTime: string | null,
    author: Author | null,
    details: EventGiveawayDetails,
}

export { EventGiveaway, Event }
