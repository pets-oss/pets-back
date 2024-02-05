import { IResolvers } from 'graphql-tools';
import {
    getStreetfindEventsQuery,
    getGiveawayEventsQuery,
    getMedicationEvents,
    getSurgeryEvents,
    getDeathEvents,
    getEventTypeTranslationQuery,
    getEventGroupTranslationQuery,
} from '../../sql-queries/event';
import { getAuthor } from './author';

const defaultLanguage: string = 'lt';

function getMicrochippingEvents() {
    return [{
        id: 51,
        animal_id: 2,
        group: 'General',
        type: 'Microchipping',
        date_time: '2021-05-23',
        create_time: '2021-05-23',
        author: 'afhu9w4f78',
        comments: 'Dog can be identified now, good.',
        microchip: {
            microchip_id: 1,
            chip_company_code: 2,
            install_place_id: 2,
            status: 'Implanted',
        },
    }];
}

const getEventGroupTranslation =
async ({ group }: any, { language }: any, { pgClient }: any) => {
    const dbResponse = await pgClient.query(
        getEventGroupTranslationQuery(group, language, defaultLanguage)
    );

    return dbResponse.rows[0];
};

const getEventTypeTranslation =
async ({ type }: any, { language }: any, { pgClient }: any) => {
    const dbResponse = await pgClient.query(
        getEventTypeTranslationQuery(type, language, defaultLanguage)
    );

    return dbResponse.rows[0];
};

const resolvers: IResolvers = {
    Query: {
        events: async (_, { animalId, groups, types }, { pgClient }) => {
            const events = [];

            if (!groups || groups.includes('General')) {
                events.push(...getMicrochippingEvents());
            }

            if (!groups || groups.includes('Registration')) {
                if (!types || types.includes('Streetfind')) {
                    const streetfindEvents =
                    await pgClient.query(getStreetfindEventsQuery(animalId));
                    events.push(...streetfindEvents.rows);
                }

                if (!types || types.includes('Giveaway')) {
                    const giveawayEvents = await pgClient.query(getGiveawayEventsQuery(animalId));
                    events.push(...giveawayEvents.rows);
                }
            }

            if (!groups || groups.includes('Medical')) {
                if (!types || types.includes('Medication')) {
                    const medicationEvents = await pgClient.query(getMedicationEvents(animalId));
                    events.push(...medicationEvents.rows);
                }

                if (!types || types.includes('Surgery')) {
                    const surgeryEvents = await pgClient.query(getSurgeryEvents(animalId));
                    events.push(...surgeryEvents.rows);
                }

                if (!types || types.includes('Death')) {
                    const deathEvents = await pgClient.query(getDeathEvents(animalId));
                    events.push(...deathEvents.rows);
                }
            }

            return events;
        }
    },
    Event: {
        author: getAuthor,
        __resolveType: ({ type }: { type: string }) => type,
        type: getEventTypeTranslation,
        group: getEventGroupTranslation,
    },
    // Microchipping: {

    // }
}

export default resolvers;
