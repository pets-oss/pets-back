import { IResolvers } from 'graphql-tools';
import { getAnimalQuery, getAnimalsQuery } from '../../sql-queries/animal';
import {
    getFavoriteAnimalsQuery,
    createFavoriteAnimalQuery,
    deleteFavoriteAnimalQuery,
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
                throw new Error(
                    'Favorite animals could not be retrieved due to undefined user id'
                );
            }
            
            let dbResponse;
            dbResponse = await pgClient.query(
                getFavoriteAnimalsQuery(userId)
            );
            
            if(dbResponse.rows){
                const animalIds = dbResponse.rows.map(
                    (animal: FavoriteAnimal) => animal.animal_id
                );
                dbResponse = await pgClient.query(
                    getAnimalsQuery(animalIds, null, null, null)
                );
            }

            return dbResponse.rows;
        },
    },
    Mutation: {
        createFavoriteAnimal: async (_, { animalId }, { pgClient, userId }) => {
            if (!userId) {
                throw new Error(
                    'Animal could not be added to the list of favorite animals due to undefined user id'
                );
            }
            
            let dbResponse;
            dbResponse = await pgClient.query(
                createFavoriteAnimalQuery({
                    userId,
                    animalId
                })
            );

            dbResponse = await pgClient.query(
                getAnimalQuery(animalId)
            );
            
            return dbResponse.rows[0];
            
        },
        deleteFavoriteAnimal: async (_, { animalId }, { pgClient, userId }) => {
            if (!userId) {
                throw new Error(
                    'Animal could not be removed from the list of favorite animals due to undefined user id'
                );
            }
            
            let dbResponse;
            dbResponse = await pgClient.query(
                deleteFavoriteAnimalQuery({
                    userId,
                    animalId
                })
            );
            
            dbResponse = await pgClient.query(
                getAnimalQuery(animalId)
            );
            
            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
