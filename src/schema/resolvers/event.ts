import { IResolvers } from 'graphql-tools';
import {
    getRescueEventsQuery,
    getGeneralEventsQuery,
    getHandOverEventsQuery,
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

function appendRescueEventsDetails(events: any[]) {
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

function appendHandOverEventsDetails(events: any[]) {
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
        author: 'afhu9w4f78',
        details: {
            microchip: {
                microchip_id: 1,
                animal_id: 2,
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
                const rescueEvents = await pgClient.query(getRescueEventsQuery(animalId));
                const handOverEvents = await pgClient.query(getHandOverEventsQuery(animalId));

                events.push(...appendEventsDetails(generalEvents.rows))
                events.push(...appendRescueEventsDetails(rescueEvents.rows))
                events.push(...appendHandOverEventsDetails(handOverEvents.rows))
                events.push(...getMicrochippingEvents());
            }

            if (!groups || groups.includes('Medical')) {
                events.push(...getMedicationEvents());
            }

            return events;
        }
    },
    Event: {
        author: getAuthor,
        __resolveType: ({ type }: { type: string }) => type
    },
}

export default resolvers;
