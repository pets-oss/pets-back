import EventType from './eventType.interface';

enum Category {
    GENERAL = 'GENERAL',
    MEDICAL = 'MEDICAL'
}

export default interface Event {
    id: number,
    animal: number,
    type: EventType,
    expenses: number | null,
    dateTime: string | null,
    comments: string | null,
    category: Category
}
