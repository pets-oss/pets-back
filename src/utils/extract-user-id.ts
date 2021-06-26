import jwt_decode, { JwtPayload } from 'jwt-decode';

const extractUserId = (req: any) => {
    if (process.env.AUTH_DISABLED === 'true') {
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
