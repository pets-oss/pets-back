import Role from './role.interface';

export default interface User {
    id: string,
    username: string,
    name: string | null,
    surname: string | null,
    email: string | null,
    roles: [Role],
    modTime: string | null
}
