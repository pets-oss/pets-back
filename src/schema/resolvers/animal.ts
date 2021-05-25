import { IResolvers } from 'graphql-tools';
import {
    createAnimalQuery,
    deleteAnimalQuery,
    getAnimalQuery,
    getAnimalsQuery,
    updateAnimalQuery
} from '../../sql-queries/animal';
import {
    createAnimalDetailsQuery,
    getAnimalDetailsQuery,
    updateAnimalDetailsQuery
} from '../../sql-queries/animalDetails';
import {
    createAnimalMicrochipQuery,
    getImplantedAnimalMicrochipQuery,
    updateAnimalMicrochipQuery
} from '../../sql-queries/animalMicrochip';
import {
    createAnimalRegistrationQuery,
    getActiveAnimalRegistrationQuery,
    updateAnimalRegistrationQuery
} from '../../sql-queries/animalRegistration';
import { getStatusTranslationQuery } from '../../sql-queries/status';
import Animal from '../../../test/interfaces/animal.interface';

const defaultLanguage: string = 'lt';

async function getUpdateDetailsResult(input: any, pgClient: any) {
    const getAnimalDetailsResponse = await pgClient.query(
        getAnimalDetailsQuery(input.id)
    );
    if (getAnimalDetailsResponse.rows.length) {
        return pgClient.query(
            updateAnimalDetailsQuery({
                ...input.details,
                animalId: input.id
            })
        );
    }
    return pgClient.query(
        createAnimalDetailsQuery({
            ...input.details,
            animalId: input.id
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
                microchipId: getAnimalMicrochipResponse.rows[0].microchipId
            })
        );
    }
    return pgClient.query(
        createAnimalMicrochipQuery({
            ...input.microchip,
            animalId: input.id
        })
    );
}

interface SelectAnimalInput {
    ids?: [number],
    after?: string | null,
    first?: number | null,
    before?: string | null,
    last?: number | null
}

interface PageInfo {
    has_next_page: boolean,
    has_previous_page: boolean,
    start_cursor: string | null,
    end_cursor: string | null
}

interface AnimalsConnection {
    page_info: PageInfo,
    edges: AnimalEdge[] | null,
}

interface AnimalEdge {
    node: Animal
    cursor: string
}

const resolvers: IResolvers = {
    Query: {
        animals: async (
            _,
            { ids, first, after, last, before }: SelectAnimalInput,
            { pgClient }
        ): Promise<AnimalsConnection> => {
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

            const dbResponse = await pgClient.query(getAnimalsQuery({
                ids,
                limit: limit ? limit + 1 : limit,
                cursor: cursor ? Buffer.from(cursor, 'base64').toString() : undefined,
                reverse
            }));

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
        }
    },
    Mutation: {
        createAnimal: async (_, { input }, { pgClient, cloudinaryClient }) => {
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
                const animalId = createAnimalResult.rows[0].id;
                const createRegistrationResult = await pgClient.query(
                    createAnimalRegistrationQuery({
                        ...data.registration,
                        animalId
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
                            animalId
                        })
                    );
                }

                await pgClient.query('COMMIT');

                return {
                    ...createAnimalResult.rows[0],
                    registration: createRegistrationResult.rows[0],
                    details: createDetailsResult?.rows[0],
                    microchip: createMicrochipResult?.rows[0]
                };
            } catch (e) {
                await pgClient.query('ROLLBACK');
                throw e;
            }
        },
        updateAnimal: async (_, { input }, { pgClient, cloudinaryClient }) => {
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
                        animalId: data.id
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
                    microchip: updateMicrochipResult.rows[0]
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
        }
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
        }
    }
};

export default resolvers;
