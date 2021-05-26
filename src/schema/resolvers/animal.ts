import { IResolvers } from 'graphql-tools';
import { Validator } from 'node-input-validator';
import {
    getAnimalQuery,
    getAnimalsQuery,
    createAnimalQuery,
    updateAnimalQuery,
    deleteAnimalQuery,
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

interface Animal {
    id: number
}
const resolvers: IResolvers = {
    Query: {
        animals: async (_,
            { ids, species, gender, breed,  first, after, last, before },
            { pgClient }) => {
            if ((first || after) && (last || before)) {
                throw new Error('Feature not implemented, try only with first and after or last and before');
            }
            if (first != null && first < 0) {
                throw new Error('first can not be less than zero');
            }
            if (last != null && last < 0) {
                throw new Error('last can not be less than zero');
            }
            const reverse = !!(last || before);
            const limit = first || last;
            const cursor = after || before;

            const dbResponse = await pgClient.query(getAnimalsQuery(
                ids,
                species,
                gender,
                breed,
                limit ? limit + 1 : limit,
                reverse,
                cursor ? Buffer.from(cursor, 'base64').toString() : null
            ));

            let { rows } = dbResponse;
            const hasMore = limit ? rows.length > limit : false;
            if (hasMore) {
                rows.pop();
            }
            if (reverse) {
                rows = rows.reverse();
            }

            const edges = rows.map((value: Animal) => ({
                cursor: Buffer.from(value.id.toString()).toString('base64'),
                node: value
            }));

            const firstEdge = edges[0];
            const lastEdge = edges[edges.length - 1];

            return {
                page_info: {
                    has_next_page: reverse ? false : hasMore,
                    has_previous_page: reverse ? hasMore : false,
                    start_cursor: firstEdge ?
                        firstEdge.cursor : null,
                    end_cursor: lastEdge ? lastEdge.cursor : null
                },
                edges
            };
        },
        animal: async (_, { id }, { pgClient }) => {
            const dbResponse = await pgClient.query(getAnimalQuery(id));
            return dbResponse.rows[0];
        },
    },
    Mutation: {
        createAnimal: async (_, { input }, { pgClient, cloudinaryClient }) => {
            const createAnimalInputValidator = new Validator(input, {
                name: 'maxLength:128',
                organization: 'integer|min:1',
                'registration.registrationDate': 'date|dateBeforeToday:0,days',
                'details.breedId': 'integer|min:1',
                'details.genderId': 'integer|min:1',
                'details.colorId': 'integer|min:1',
                'details.birthDate': 'date|dateBeforeToday:0,days',
                'details.weight': 'integer|min:1',
                'microchip.chipCompanyCode': 'integer|min:1',
                'microchip.installDate': 'date|dateBeforeToday:0,days',
                'microchip.installPlaceId': 'integer|min:1',
            });

            const isCreateAnimalInputValid =
                await createAnimalInputValidator.check();

            if (!isCreateAnimalInputValid) {
                throw new Error(
                    JSON.stringify(createAnimalInputValidator.errors)
                );
            }

            const { image, ...inputData } = input;

            let data = { ...inputData };
            if (process.env.CLOUDINARY_DISABLED !== 'true') {
                const imageUrl = await cloudinaryClient.uploadImage(image);
                if (imageUrl) {
                    data = { ...inputData, imageUrl };
                }
            }
            try {
                await pgClient.query('BEGIN');

                const createAnimalResult = await pgClient.query(
                    createAnimalQuery(data)
                );
                const {
                    rows: [{ id: animalId }],
                } = createAnimalResult;
                const createRegistrationResult = await pgClient.query(
                    createAnimalRegistrationQuery({
                        ...data.registration,
                        animalId,
                    })
                );

                let createDetailsResult;
                if (data.details) {
                    createDetailsResult = await pgClient.query(
                        createAnimalDetailsQuery({ ...data.details, animalId })
                    );
                }

                let createMicrochipResult;
                if (data.microchip) {
                    createMicrochipResult = await pgClient.query(
                        createAnimalMicrochipQuery({
                            ...data.microchip,
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
        updateAnimal: async (_, { input }, { pgClient, cloudinaryClient }) => {
            const updateAnimalInputValidator = new Validator(input, {
                name: 'maxLength:128',
                organization: 'integer|min:1',
                'registration.registrationDate': 'date|dateBeforeToday:0,days',
                'details.breedId': 'integer|min:1',
                'details.genderId': 'integer|min:1',
                'details.colorId': 'integer|min:1',
                'details.birthDate': 'date|dateBeforeToday:0,days',
                'details.weight': 'integer|min:1',
                'microchip.chipCompanyCode': 'integer|min:1',
                'microchip.installDate': 'date|dateBeforeToday:0,days',
                'microchip.installPlaceId': 'integer|min:1',
            });

            const isUpdateAnimalInputValid =
                await updateAnimalInputValidator.check();

            if (!isUpdateAnimalInputValid) {
                throw new Error(
                    JSON.stringify(updateAnimalInputValidator.errors)
                );
            }

            const { image, ...inputData } = input;

            let data = { ...inputData };
            if (process.env.CLOUDINARY_DISABLED !== 'true') {
                const imageUrl = await cloudinaryClient.uploadImage(image);
                if (imageUrl) {
                    data = { ...inputData, imageUrl };
                }
            }
            try {
                await pgClient.query('BEGIN');

                if (process.env.CLOUDINARY_DISABLED !== 'true') {
                    const oldAnimalEntry = await pgClient.query(
                        getAnimalQuery(data.id)
                    );
                    if (oldAnimalEntry?.rows[0]?.image_url) {
                        cloudinaryClient.deleteImage(
                            oldAnimalEntry.rows[0].image_url
                        );
                    }
                }

                const updateAnimalResult = await pgClient.query(
                    updateAnimalQuery(data)
                );
                const updateRegistrationResult = await pgClient.query(
                    updateAnimalRegistrationQuery({
                        ...data.registration,
                        animalId: data.id,
                    })
                );

                const updateDetailsResult = await getUpdateDetailsResult(
                    data,
                    pgClient
                );
                const updateMicrochipResult = await getUpdateMicrochipResult(
                    data,
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
        deleteAnimal: async (_, { input }, { pgClient, cloudinaryClient }) => {
            const dbResponse = await pgClient.query(deleteAnimalQuery(input));
            if (
                process.env.CLOUDINARY_DISABLED !== 'true' &&
                dbResponse?.rows[0]?.image_url
            ) {
                cloudinaryClient.deleteImage(dbResponse.rows[0].image_url);
            }
            return dbResponse.rows[0];
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
