import { QueryConfig } from 'pg';

export const getFormerAnimalOwnersQuery = (): QueryConfig => {
    const text = 'SELECT * FROM former_animal_owner';
    
    return {
        text
    };
};

export const getFormerAnimalOwnerQuery = (id: number): QueryConfig => {
    const text = 'SELECT * FROM former_animal_owner WHERE id = $1';
    
    return {
        text,
        values: [ id ]
    };
};
