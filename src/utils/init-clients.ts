import initPostgres from '../services/postgres';
import initCloudinary from '../services/cloudinary';

export default async () => {
    const pgClient = await initPostgres();
    const cloudinaryClient = initCloudinary();

    return {
        pgClient,
        cloudinaryClient
    };
};
