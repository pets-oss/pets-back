import { IResolvers } from 'graphql-tools';
import {
    getStreetfindEventsQuery,
    getGeneralEventsQuery,
    getGiveawayEventsQuery,
    getLocationChangeEvents,
    getMedicationEvents,
    getSurgeryEvents,
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

function appendStreetfindEventsDetails(events: any[]) {
    return events.map((event: any) => ({
        id: event.id,
        animal_id: event.animal_id,
        group: event.group,
        type: event.type,
        date_time: event.date_time,
        author: event.author,
        create_time: event.create_time,
        mod_time: event.mod_time,
        comments: event.comments,
        details: {
            registration_no: event.registration_no,
            registration_date: event.registration_date,
            street: event.street,
            house_no: event.house_no,
            municipality_id: event.municipality_id,
        }
    }));
}

function appendGiveawayEventsDetails(events: any[]) {
    return events.map((event: any) => ({
        id: event.id,
        animal_id: event.animal_id,
        category: event.category,
        group: event.group,
        type: event.type,
        date_time: event.date_time,
        author: event.author,
        create_time: event.create_time,
        mod_time: event.mod_time,
        comments: event.comments,
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

function appendLocationChangeEventsDetails(events: any[]) {
    return events.map((event: any) => ({
        id: event.id,
        animal_id: event.animal_id,
        group: event.group,
        type: event.type,
        date_time: event.date_time,
        author: event.author,
        create_time: event.create_time,
        mod_time: event.mod_time,
        comments: event.comments,
        details: {
            street: event.street,
            house_no: event.house_no,
            municipality_id: event.municipality_id,
        }
    }));
}

function appendMedicationEventsDetails(events: any[]) {
    return events.map((event: any) => ({
        id: event.id,
        animal_id: event.animal_id,
        group: event.group,
        type: event.type,
        date_time: event.date_time,
        author: event.author,
        create_time: event.create_time,
        mod_time: event.mod_time,
        comments: event.comments,
        details: {
            treatment: event.treatment,
            expenses: event.expenses,
        }
    }));
}

function appendSurgeryEventsDetails(events: any[]) {
    return events.map((event: any) => ({
        id: event.id,
        animal_id: event.animal_id,
        group: event.group,
        type: event.type,
        date_time: event.date_time,
        author: event.author,
        create_time: event.create_time,
        mod_time: event.mod_time,
        comments: event.comments,
        details: {
            surgery: event.surgery,
            result: event.result,
            expenses: event.expenses,
        }
    }));
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
        events: async (_, { animalId, groups, types }, { pgClient }) => {
            const events = [];

            if (!groups || groups.includes('General')) {
                const generalEvents = await pgClient.query(getGeneralEventsQuery(animalId));
                events.push(...appendEventsDetails(generalEvents.rows))

                if (!types || types.includes('LocationChange')) {
                    const locationChangeEvents =
                    await pgClient.query(getLocationChangeEvents(animalId));
                    events.push(...appendLocationChangeEventsDetails(locationChangeEvents.rows))
                }

                events.push(...getMicrochippingEvents());
            }

            if (!groups || groups.includes('Registration')) {
                if (!types || types.includes('Streetfind')) {
                    const streetfindEvents =
                    await pgClient.query(getStreetfindEventsQuery(animalId));
                    events.push(...appendStreetfindEventsDetails(streetfindEvents.rows));
                }

                if (!types || types.includes('Giveaway')) {
                    const giveawayEvents = await pgClient.query(getGiveawayEventsQuery(animalId));
                    events.push(...appendGiveawayEventsDetails(giveawayEvents.rows));
                }
            }

            if (!groups || groups.includes('Medical')) {
                if (!types || types.includes('Medication')) {
                    const medicationEvents = await pgClient.query(getMedicationEvents(animalId));
                    events.push(...appendMedicationEventsDetails(medicationEvents.rows));
                }

                if (!types || types.includes('Surgery')) {
                    const surgeryEvents = await pgClient.query(getSurgeryEvents(animalId));
                    events.push(...appendSurgeryEventsDetails(surgeryEvents.rows));
                }
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
