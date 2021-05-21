import { IResolvers } from 'graphql-tools';
import {
    getFoundEventsQuery,
    getGeneralEventsQuery,
    getGivenAwayEventsQuery,
    getMedicalEventsQuery,
} from '../../sql-queries/event';

function appendEventsDetails(events: any[]) {
    return events.map((event: any) => ({
        id: event.id,
        animal_id: event.animal_id,
        category: event.category,
        group: event.group,
        type: event.type,
        date_time: event.date_time,
        comments: event.comments,
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
        comments: event.comments,
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
        comments: event.comments,
        details: {
            former_owner_id: event.former_owner_id,
            reason: event.reason
        }
    }));
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
            }

            if (!groups || groups.includes('Medical')) {
                const medicalEvents = await pgClient.query(getMedicalEventsQuery(animalId));

                events.push(...appendEventsDetails(medicalEvents.rows));
            }

            return events;
        }
    },
    Event: {
        __resolveType: ({ category }: { category: string }) => category
    },
}

export default resolvers;
