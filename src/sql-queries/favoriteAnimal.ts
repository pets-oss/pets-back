import { QueryConfig } from 'pg';

interface CreateFavoriteAnimalInput {
    userId: String;
    animalId: number;
}

interface DeleteFavoriteAnimalInput {
    userId: String;
    animalId: number;
}

const returning = 'user_id, animal_id, mod_time';
const animalFavoriteTable = 'animal_favorite';

export const getFavoriteAnimalsQuery = (user_id: String): QueryConfig => {
    const text = `
        SELECT ${returning}
        FROM ${animalFavoriteTable}
        WHERE user_id = $1;
    `;

    return {
        text,
        values: [user_id],
    };
};

export const getFavoriteAnimalByIdQuery = ({
    userId,
    animalId
}: CreateFavoriteAnimalInput): QueryConfig => {
    const text = `
        SELECT ${returning}
        FROM ${animalFavoriteTable}
        WHERE user_id = $1
            AND animal_id = $2;
    `;

    return {
        text,
        values: [userId, animalId],
    };
};

export const createFavoriteAnimalQuery = (
    input: CreateFavoriteAnimalInput
): QueryConfig => {
    const { userId, animalId } = input;
    const text = `
        INSERT INTO ${animalFavoriteTable} (
            user_id,
            animal_id
        )
        VALUES (
            $1,
            $2
        )
        RETURNING ${returning};
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
