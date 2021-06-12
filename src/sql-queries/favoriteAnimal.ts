import { QueryConfig } from 'pg';

interface GetFavoriteAnimalInput {
    userId: String;
    animalId: number;
}

interface CreateFavoriteAnimalInput {
    userId: String;
    animalId: number;
}

interface DeleteFavoriteAnimalInput {
    userId: String;
    animalId: number;
}

export const getFavoriteAnimalQuery = (
    input: GetFavoriteAnimalInput
): QueryConfig => {
    const { userId, animalId } = input;
    const text = `
        SELECT
            user_id,
            animal_id,
            mod_time
        FROM animal_favorite
        WHERE user_id = $1 AND animal_id = $2;
    `;

    return {
        text,
        values: [
            userId,
            animalId
        ],
    };
};

export const getFavoriteAnimalsQuery = (user_id: String): QueryConfig => {
    const text = `
        SELECT
            user_id,
            animal_id,
            mod_time
        FROM animal_favorite
        WHERE user_id = $1;
    `;

    return {
        text,
        values: [user_id],
    };
};

export const createFavoriteAnimalQuery = (
    input: CreateFavoriteAnimalInput
): QueryConfig => {
    const { userId, animalId } = input;
    const text = `
        INSERT INTO animal_favorite (
            user_id,
            animal_id
        )
        VALUES (
            $1,
            $2
        )
        RETURNING
            user_id,
            animal_id,
            mod_time;
    `;

    return {
        text,
        values: [
            userId,
            animalId
        ]
    };
};

export const deleteFavoriteAnimalQuery = (
    input: DeleteFavoriteAnimalInput
): QueryConfig => {
    const { userId, animalId } = input;
    const text = `
        DELETE FROM animal_favorite
        WHERE user_id = $1 AND animal_id = $2
        RETURNING
            user_id,
            animal_id,
            mod_time;
    `;

    return {
        text,
        values: [
            userId,
            animalId
        ]
    };
};
