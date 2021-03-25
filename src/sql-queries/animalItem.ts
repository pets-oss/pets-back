import { QueryConfig } from "pg";

export const getAnimalItemsQuery = () : QueryConfig => {
    const text = "SELECT * FROM animal_item";
    return { text };
}

export const getAnimalItemQuery = (id: number): QueryConfig => {
    const text = "SELECT * FROM animal_item WHERE id = $1";
    return {
        text,
        values: [id]
    }
}