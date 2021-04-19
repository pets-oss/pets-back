import { QueryConfig } from 'pg';

export const getorganizationTasksQuery = (): QueryConfig => {
    const text = 'SELECT * FROM organization_task';
    return { text };
}

export const getorganizationTaskQuery = (id: number): QueryConfig => {
    const text = 'SELECT * FROM organization_task WHERE id = $1';
    return {
        text,
        values: [id]
    }
}
