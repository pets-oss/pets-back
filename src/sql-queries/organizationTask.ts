import { QueryConfig } from 'pg';

export const getOrganizationTasksQuery = () : QueryConfig => {
    const text = 'SELECT * FROM organization_task';
    return { text };
}

export const getOrganizationTaskQuery = (id: number) : QueryConfig => {
    const text = 'SELECT * FROM organization_task WHERE id = $1';
    return {
        text,
        values: [id]
    }
}
