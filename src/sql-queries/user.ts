import { QueryConfig } from 'pg';
import { insert, select, update, deleteFrom } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

interface UserInput {
    id: String,
    username: String;
    name: String;
    surname: String;
    email: String;
}

export const getUserQuery = (id: number): QueryConfig =>
    select().from('app_user').where({ id,}).toParams();

export const getUsersQuery = (): QueryConfig =>
    select().from('app_user').toParams();

export const createUserQuery = (input: UserInput): QueryConfig =>
    insert('app_user', snakeCaseKeys(input))
        .returning(
            'id, username, name, surname, email, mod_time'
        ).toParams();

export const updateUserQuery = (input: UserInput): QueryConfig =>
    update('app_user', snakeCaseKeys(input))
        .where({ id: input.id })
        .returning(
            'id, username, name, surname, email, mod_time'
        ).toParams();

export const deleteUserQuery = (id: String): QueryConfig =>
    deleteFrom('app_user')
        .where({ id })
        .returning(
            'id, username, name, surname, email, mod_time'
        ).toParams();
