export default interface Connection<T> {
    edges: Edge<T>[];
    pageInfo: PageInfo;
}

interface Edge<T> {
    node: T;
    cursor: string;
}

interface PageInfo {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalCount: number;
}
