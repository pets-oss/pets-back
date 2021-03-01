import { IResolvers } from 'graphql-tools';
import {
    getAnimalQuery,
    getAnimalsQuery,
    createAnimalQuery,
    updateAnimalQuery,
} from '../../sql-queries/animal';
import {
    getAnimalDetailsQuery,
    createAnimalDetailsQuery,
    updateAnimalDetailsQuery,
} from '../../sql-queries/animalDetails';
import {
    createAnimalMicrochipQuery,
    getImplantedAnimalMicrochipQuery,
    updateAnimalMicrochipQuery,
} from '../../sql-queries/animalMicrochip';
import {
    getActiveAnimalRegistrationQuery,
    createAnimalRegistrationQuery,
    updateAnimalRegistrationQuery,
} from '../../sql-queries/animalRegistration';
import { getStatusTranslationQuery } from '../../sql-queries/status';

const defaultLanguage: string = 'lt';

async function getUpdateDetailsResult(input: any, pgClient: any) {
    const getAnimalDetailsResponse = await pgClient.query(
        getAnimalDetailsQuery(input.id)
    );
    if (getAnimalDetailsResponse.rows.length) {
        return pgClient.query(
            updateAnimalDetailsQuery({
                ...input.details,
                animalId: input.id,
            })
        );
    }
    return pgClient.query(
        createAnimalDetailsQuery({
            ...input.details,
            animalId: input.id,
        })
    );
}

async function getUpdateMicrochipResult(input: any, pgClient: any) {
    const getAnimalMicrochipResponse = await pgClient.query(
        getImplantedAnimalMicrochipQuery(input.id)
    );
    if (getAnimalMicrochipResponse.rows.length) {
        return pgClient.query(
            updateAnimalMicrochipQuery({
                ...input.microchip,
                animalId: input.id,
                microchipId: getAnimalMicrochipResponse.rows[0].microchipId,
            })
        );
    }
    return pgClient.query(
        createAnimalMicrochipQuery({
            ...input.microchip,
            animalId: input.id,
        })
    );
}

const resolvers: IResolvers = {
    Query: {
        animals: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalsQuery());
            return dbResponse.rows;
        },
        animal: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalQuery(id));
            return dbResponse.rows[0];
        },
    },
    Mutation: {
        createAnimal: async (_, { input }, { pgClient }) => {
            try {
                await pgClient.query('BEGIN');

                const createAnimalResult = await pgClient.query(
                    createAnimalQuery(input)
                );
                const animalId = createAnimalResult.rows[0].id;
                const createRegistrationResult = await pgClient.query(
                    createAnimalRegistrationQuery({
                        ...input.registration,
                        animalId,
                    })
                );

                let createDetailsResult;
                if (input.details) {
                    createDetailsResult = await pgClient.query(
                        createAnimalDetailsQuery({ ...input.details, animalId })
                    );
                }

                let createMicrochipResult;
                if (input.microchip) {
                    createMicrochipResult = await pgClient.query(
                        createAnimalMicrochipQuery({
                            ...input.microchip,
                            animalId,
                        })
                    );
                }

                await pgClient.query('COMMIT');

                return {
                    ...createAnimalResult.rows[0],
                    registration: createRegistrationResult.rows[0],
                    details: createDetailsResult?.rows[0],
                    microchip: createMicrochipResult?.rows[0],
                };
            } catch (e) {
                await pgClient.query('ROLLBACK');
                throw e;
            }
        },
        updateAnimal: async (_, { input }, { pgClient }) => {
            try {
                await pgClient.query('BEGIN');
                const updateAnimalResult = await pgClient.query(
                    updateAnimalQuery(input)
                );
                const updateRegistrationResult = await pgClient.query(
                    updateAnimalRegistrationQuery({
                        ...input.registration,
                        animalId: input.id,
                    })
                );

                const updateDetailsResult = await getUpdateDetailsResult(
                    input,
                    pgClient
                );
                const updateMicrochipResult = await getUpdateMicrochipResult(
                    input,
                    pgClient
                );

                await pgClient.query('COMMIT');
                return {
                    ...updateAnimalResult.rows[0],
                    registration: updateRegistrationResult.rows[0],
                    details: updateDetailsResult.rows[0],
                    microchip: updateMicrochipResult.rows[0],
                };
            } catch (e) {
                await pgClient.query('ROLLBACK');
                throw e;
            }
        },
    },
    Animal: {
        details: async ({ id }, __, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalDetailsQuery(id));
            return dbResponse.rows[0];
        },
        registration: async ({ id }, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getActiveAnimalRegistrationQuery(id)
            );
            return dbResponse.rows[0];
        },
        microchip: async ({ id }, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getImplantedAnimalMicrochipQuery(id)
            );
            return dbResponse.rows[0];
        },
        status: async ({ status }, { language }, { pgClient }) => {
            if (!status) {
                return null;
            }
            const dbResponse = await pgClient.query(
                getStatusTranslationQuery(status, language, defaultLanguage)
            );

            return dbResponse.rows[0].status;
        },
    },
};

export default resolvers;
