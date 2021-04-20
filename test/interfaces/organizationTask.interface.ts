export default interface OrganizationTask {
    id: number;
    title: string;
    description: string | null;
    organization: number;
    isDone: boolean | null;
}
