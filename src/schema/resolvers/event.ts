import { IResolvers } from 'graphql-tools';
import {
    getAllAnimalEvents,
    getAllEvents,
    getAllEventTypes,
    getAllGeneralEvents,
    getAllMedicalEvents,
    getAnimalGeneralEvents,
    getAnimalMedicalEvents,
    getEventType
} from '../../sql-queries/event';

const resolvers: IResolvers = {
    Query: {
        events: async (_, { language }, ___, { variableValues }) => {
            Object.assign(variableValues, { language })
            return [{}];
        }
    },
    Events: {
        types: async (_, __, { pgClient }, { variableValues }) => {
            const { language } = variableValues;

            const dbResponse = await pgClient.query(getAllEventTypes(language));

            return dbResponse.rows;
        },
        all: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAllEvents());


            return dbResponse.rows;
        },
        animalAll: async (_, { animalId }, { pgClient }) => {
            const dbResponse = await pgClient
                .query(getAllAnimalEvents(animalId));

            return dbResponse.rows;
        },
        general: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAllGeneralEvents());

            return dbResponse.rows;
        },
        animalGeneral: async(_, { animalId }, { pgClient }) => {
            const dbResponse = await pgClient
                .query(getAnimalGeneralEvents(animalId));

            return dbResponse.rows;
        },
        medical: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAllMedicalEvents());

            return dbResponse.rows;
        },
        animalMedical: async(_, { animalId }, { pgClient }) => {
            const dbResponse = await pgClient
                .query(getAnimalMedicalEvents(animalId));

            return dbResponse.rows;
        }
    },
    Event: {
        type: async ({ type }, __, { pgClient }, { variableValues }) => {
            const { language } = variableValues;

            const dbResponse = await pgClient
                .query(getEventType(type, language));

            return dbResponse.rows[0];
        }
    }
}

export default resolvers;
