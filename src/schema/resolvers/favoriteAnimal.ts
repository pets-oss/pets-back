import { ValidationError } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { getAnimalsQuery } from '../../sql-queries/animal';
import {
    createFavoriteAnimalQuery,
    deleteFavoriteAnimalQuery,
    getFavoriteAnimalsQuery,
} from '../../sql-queries/favoriteAnimal';

interface FavoriteAnimal {
    user_id: String;
    animal_id: number;
    mod_time: String;
}

const resolvers: IResolvers = {
    Query: {
        favoriteAnimals: async (_, __, { pgClient, userId }) => {
            if (!userId) {
                throw new ValidationError(
                    'Favorite animals could not be retrieved due to undefined user id'
                );
            }

            let dbResponse;
            dbResponse = await pgClient.query(
                getFavoriteAnimalsQuery(userId)
            );

            if (Array.isArray(dbResponse.rows) && dbResponse.rows.length > 0) {
                const animalIds = dbResponse.rows.map(
                    (animal: FavoriteAnimal) => animal.animal_id
                );
                dbResponse = await pgClient.query(
                    getAnimalsQuery(animalIds)
                );
            }

            return dbResponse.rows;
        },
    },
    Mutation: {
        createFavoriteAnimal: async (_, { animalId }, { pgClient, userId }) => {
            if (!userId) {
                throw new ValidationError(
                    'Animal could not be added to the list of favorite animals due to undefined user id'
                );
            }

            const dbResponse = await pgClient.query(
                createFavoriteAnimalQuery({
                    userId,
                    animalId
                })
            );

            return dbResponse.rows[0];

        },
        deleteFavoriteAnimal: async (_, { animalId }, { pgClient, userId }) => {
            if (!userId) {
                throw new ValidationError(
                    'Animal could not be removed from the list of favorite animals due to undefined user id'
                );
            }

            const dbResponse = await pgClient.query(
                deleteFavoriteAnimalQuery({
                    userId,
                    animalId
                })
            );

            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
