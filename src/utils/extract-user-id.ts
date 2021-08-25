import jwt_decode, { JwtPayload } from 'jwt-decode';

const FAKE_USERS = ['userIdForTestingNoFavoriteAnimals'];

const extractUserId = (req: any) => {
    if (process.env.AUTH_DISABLED === 'true') {
        for (let i = 0; i < FAKE_USERS.length; i += 1) {
            if (FAKE_USERS.includes(req?.headers?.['fake-user'])) {
                return FAKE_USERS[i]
            }
        }

        return 'userIdForTesting';
    }
    const authorization: string | undefined = req?.headers?.authorization;
    if (!authorization) {
        return undefined;
    }
    const token = authorization.replace('Bearer', '').trim();
    const data = jwt_decode<JwtPayload>(token);
    return data.sub;
}
export default extractUserId;
