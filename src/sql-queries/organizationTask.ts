import { QueryConfig } from 'pg';

const table = 'organization_task';
const returnFields = 'id, title, description, organization_id as organization, is_done';

export const getOrganizationTasksQuery = (): QueryConfig => {
    const text = `SELECT ${returnFields}
                  FROM ${table}`;
    return { text };
};

export const getOrganizationTaskQuery = (id: number): QueryConfig => {
    const text = `SELECT ${returnFields}
                  FROM ${table} WHERE id = $1`;
    return {
        text,
        values: [id]
    };
};
