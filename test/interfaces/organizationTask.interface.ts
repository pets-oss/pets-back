export default interface OrganizationTask {
    id: number;
    title: string;
    description?: string;
    organizationId: number;
    isDone?: boolean;
}
