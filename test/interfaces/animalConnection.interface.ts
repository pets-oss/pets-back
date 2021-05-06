import Animal from './animal.interface';
import PageInfo from './pageInfo.interface';

export default interface AnimalConnection {
    edges: AnimalEdge[]
    pageInfo: PageInfo
}

interface AnimalEdge {
    node: Animal
    cursor: string
}
