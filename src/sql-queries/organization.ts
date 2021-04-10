import { QueryConfig } from 'pg';
import { select, insert, update, delete as remove } from 'sql-bricks-postgres';
import snakeCaseKeys from 'snakecase-keys';

interface CreateOrganisationInput {
    name: String;
    country: String;
    city: String;
    streetAddress: String;
    phone: String;
}

interface UpdateOrganizationInput {
    id: number;
    name: String;
    country: String;
    city: String;
    streetAddress: String;
    phone: String;
}

export const getOrganizationQuery = (id: number): QueryConfig =>
    select()
        .from('organization')
        .where({
            id,
        })
        .toParams();

export const getOrganizationsQuery = (): QueryConfig =>
    select().from('organization').toParams();

export const createOrganizationQuery = (
    input: CreateOrganisationInput
): QueryConfig =>
    insert('organization', snakeCaseKeys(input))
        .returning('id, name, country, city, street_address, phone, mod_time')
        .toParams();

export const updateOrganizationQuery = (
    input: UpdateOrganizationInput
): QueryConfig =>
    update('organization', snakeCaseKeys(input))
        .where({
            id: input.id,
        })
        .returning('id, name, country, city, street_address, phone, mod_time')
        .toParams();

export const deleteOrganizationQuery = (id: number): QueryConfig =>
    remove('organization')
        .where({
            id,
        })
        .returning('id, name, country, city, street_address, phone, mod_time')
        .toParams();
