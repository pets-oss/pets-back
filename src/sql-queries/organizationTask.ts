import { QueryConfig } from 'pg';

export const getOrganizationTasksQuery = (): QueryConfig => {
    const text =
        'SELECT id, title, description, organization_id as organization, is_done FROM organization_task';
    return { text };
};

export const getOrganizationTaskQuery = (id: number): QueryConfig => {
    const text =
        'SELECT id, title, description, organization_id as organization, is_done FROM organization_task WHERE id = $1';
    return {
        text,
        values: [id],
    };
};
