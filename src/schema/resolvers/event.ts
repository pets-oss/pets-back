import { IResolvers } from 'graphql-tools';
import {
    getFoundEventsQuery,
    getGeneralEventsQuery,
    getGivenAwayEventsQuery,
} from '../../sql-queries/event';
import { getAuthor } from './author';

function appendEventsDetails(events: any[]) {
    return events.map((event: any) => ({
        id: event.id,
        animal_id: event.animal_id,
        category: event.category,
        group: event.group,
        type: event.type,
        date_time: event.date_time,
        create_time: event.create_time,
        comments: event.comments,
        author: event.author,
        details: {
            expenses: event.expenses
        }
    }));
}

function appendFoundEventsDetails(events: any[]) {
    return events.map((event: any) => ({
        id: event.id,
        animal_id: event.animal_id,
        category: event.category,
        group: event.group,
        type: event.type,
        date_time: event.date_time,
        create_time: event.create_time,
        comments: event.comments,
        author: event.author,
        details: {
            street: event.street,
            house_no: event.house_no,
            municipality_id: event.municipality_id
        }
    }));
}

function appendGivenAwayEventsDetails(events: any[]) {
    return events.map((event: any) => ({
        id: event.id,
        animal_id: event.animal_id,
        category: event.category,
        group: event.group,
        type: event.type,
        date_time: event.date_time,
        create_time: event.create_time,
        comments: event.comments,
        author: event.author,
        details: {
            former_owner: {
                id: event.former_owner_id,
                name: event.name,
                surname: event.surname,
                phone: event.phone

            },
            reason: event.reason
        }
    }));
}

function getMedicationEvents() {
    return [{
        id: 50,
        animal_id: 1,
        group: 'Medical',
        type: 'Medication',
        date_time: '2021-05-23',
        create_time: '2021-05-23',
        author: 'aiubfaw4io09',
        details: {
            comments: 'Dog can\'t sleep, so I gave a few pills',
            treatment: 'Some pills from insomnia',
            expenses: 2.0
        }
    }];
}

function getMicrochippingEvents() {
    return [{
        id: 51,
        animal_id: 2,
        group: 'General',
        type: 'Microchipping',
        date_time: '2021-05-23',
        create_time: '2021-05-23',
        author: 'aiubfaw4io09',
        details: {
            microchip: {
                microchip_id: 1,
                chip_company_code: 2,
                install_date: '2021-05-22',
                install_place_id: 2,
                status: 'Implanted'
            },
            comments: 'Dog can be identified now, good.',
        }
    }];
}

const resolvers: IResolvers = {
    Query: {
        events: async (_, { animalId, groups }, { pgClient }) => {
            const events = [];

            if (!groups || groups.includes('General')) {
                const generalEvents = await pgClient.query(getGeneralEventsQuery(animalId));
                const foundEvents = await pgClient.query(getFoundEventsQuery(animalId));
                const givenAwayEvents = await pgClient.query(getGivenAwayEventsQuery(animalId));

                events.push(...appendEventsDetails(generalEvents.rows))
                events.push(...appendFoundEventsDetails(foundEvents.rows))
                events.push(...appendGivenAwayEventsDetails(givenAwayEvents.rows))
                events.push(...getMicrochippingEvents());
            }

            if (!groups || groups.includes('Medical')) {
                events.push(...getMedicationEvents());
            }

            return events;
        }
    },
    Found: {
        author: getAuthor
    },
    GivenAway: {
        author: getAuthor
    },
    CheckIn: {
        author: getAuthor
    },
    CheckOut: {
        author: getAuthor
    },
    LocationChange: {
        author: getAuthor
    },
    Microchipping: {
        author: getAuthor
    },
    Medication: {
        author: getAuthor
    },
    Event: {
        // hoped for inheritance, but
        // IT DOES NOT WORK THIS WAY :(
        // author: getAuthor,
        __resolveType: ({ type }: { type: string }) => type
    },
}

export default resolvers;
