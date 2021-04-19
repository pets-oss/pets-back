export default interface OrganizationTask {
    id: string;
    title: string;
    description: string | null;
    organizationId: number;
    isDone: boolean | null;
}
