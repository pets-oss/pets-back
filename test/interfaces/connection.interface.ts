export default interface Connection<T> {
    edges: Edge<T>[]
    pageInfo: PageInfo
}

interface Edge<T> {
    node: T
    cursor: string
}

interface PageInfo {
    startCursor : string
    endCursor : string
    hasNextPage : boolean
    hasPreviousPage : boolean
}
