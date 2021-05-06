import { IResolvers } from 'graphql-tools';
import {
    createAnimalQuery,
    deleteAnimalQuery,
    getAnimalQuery,
    getAnimalsHasPreviousQuery,
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
import AnimalDetails from '../../../test/interfaces/animalDetails.interface';
import AnimalRegistration
    from '../../../test/interfaces/animalRegistration.interface';
import AnimalMicrochip
    from '../../../test/interfaces/animalMicrochip.interface';

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
    after?: string,
    first?: number,
    before?: string,
    last?: number
}

interface PageInfo {
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    startCursor: string | null,
    endCursor: string | null
}

interface AnimalsConnection {
    pageInfo: PageInfo,
    edges: AnimalEdge[] | null,
}

interface AnimalEdge {
    node: Animal
    cursor: string
}

interface Animal {
    id: number;
    organization: number;
    name: string | null;
    details: AnimalDetails;
    registration: AnimalRegistration;
    microchip: AnimalMicrochip;
    status: string | null;
    imageUrl: string | null;
    comments: string | null;
    modTime: string | null;
}

const resolvers: IResolvers = {
    Query: {
        animals: async (
            _,
            { ids, first, last, after, before }: SelectAnimalInput,
            { pgClient }
        ) => {
            if (first && first < 0) {
                throw new Error('first can not be less than zero)');
            }
            if (last && last < 0) {
                throw new Error('last can not be less than zero)');
            }
            let limit: number | undefined;
            let offset: string | undefined;
            let edges: AnimalEdge[] = [];
            let hasPreviousPage: boolean = false;
            let hasNextPage: boolean = false;

            if (first || after) {
                limit = first ? first + 1 : undefined;
                offset = after;
                // TODO: Promise.all
                if (offset) {
                    const dbResponsePrevious = await pgClient
                        .query(getAnimalsHasPreviousQuery(offset));
                    const rowsPrevious = dbResponsePrevious.rows;
                    hasPreviousPage = !!rowsPrevious?.has_previous_page;
                }
                const dbResponse = await pgClient.query(getAnimalsQuery({
                    ids,
                    limit,
                    offset
                }));
                const { rows } = dbResponse;
                hasNextPage = first ? rows.length > first : false;
                if (hasNextPage) {
                    rows.pop();
                }
                edges = rows.map(
                    (value: Animal) => ({
                        cursor: value.id.toString(),
                        node: value
                    }));
            } else if (last || before) {
                limit = last ? last + 1 : last;
                offset = before;
                // TODO: needs implementation
                return {
                    pageInfo: {
                        startCursor: null,
                        endCursor: null,
                        hasPreviousPage: false,
                        hasNextPage: false
                    },
                    edges: []
                };
            }

            const firstEdge = edges[0];
            const lastEdge = edges[edges.length - 1];

            // const connection = {
            //     pageinfo: {
            //         hasnextpage: hasNextPage,
            //         haspreviouspage: hasPreviousPage,
            //         startcursor: firstEdge ?
            //             firstEdge.cursor.toString() : null,
            //         endcursor: lastEdge ? lastEdge.cursor.toString() : null
            //     },
            //     edges
            // };

            const connection: AnimalsConnection = {
                pageInfo: {
                    hasNextPage,
                    hasPreviousPage,
                    startCursor: firstEdge ?
                        firstEdge.cursor.toString() : null,
                    endCursor: lastEdge ? lastEdge.cursor.toString() : null
                },
                edges
            };
            console.log(connection);
            return connection;
        }
        ,
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
