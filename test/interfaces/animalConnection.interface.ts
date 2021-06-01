import Animal from './animal.interface';
import Connection from './connection.interface';

type AnimalConnection = Connection<Animal>;

export default AnimalConnection;
