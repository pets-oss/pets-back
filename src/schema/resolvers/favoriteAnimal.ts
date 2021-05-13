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
        favoriteAnimals: async (_, { user_id }, { pgClient }) => {
            let dbResponse;
            dbResponse = await pgClient.query(
                getFavoriteAnimalsQuery(user_id)
            );
            
            if(dbResponse.rows){
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
        createFavoriteAnimal: async (_, { input }, { pgClient }) => {
            let dbResponse;
            dbResponse = await pgClient.query(
                createFavoriteAnimalQuery(input)
            );

            // eslint-disable-next-line prefer-destructuring
            const animalId = dbResponse.rows[0].animal_id;
            dbResponse = await pgClient.query(
                getAnimalQuery(animalId)
            );
            
            return dbResponse.rows[0];
            
        },
        deleteFavoriteAnimal: async (_, { input }, { pgClient }) => {
            let dbResponse;
            dbResponse = await pgClient.query(
                deleteFavoriteAnimalQuery(input)
            );
            
            // eslint-disable-next-line prefer-destructuring
            const animalId = dbResponse.rows[0].animal_id;
            dbResponse = await pgClient.query(
                getAnimalQuery(animalId)
            );
            
            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
