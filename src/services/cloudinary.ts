interface CloudinaryClient {
    uploadImage: (imagePromise: Promise<any>) => Promise<string | undefined>;
    deleteImage: (imageUrl: string) => void;
    checkStatus: () => Promise<boolean>;
}

const cloudinaryClient = (cloudinary: any): CloudinaryClient => ({
    uploadImage: async (
        imagePromise: Promise<any>
    ): Promise<string | undefined> => {
        const image = await imagePromise;
        return new Promise((resolve, reject) => {
            if (image) {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        transformation: {
                            width: 1200,
                            height: 675,
                            crop: 'fill'
                        }
                    },
                    (error: any, result: any) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                );
                image.createReadStream().pipe(uploadStream);
            } else {
                resolve(undefined);
            }
        });
    },
    deleteImage: (imageUrl: string) => {
        const parts = imageUrl.split('/');
        const [publicId] = parts[parts.length - 1].split('.');
        cloudinary.uploader.destroy(publicId);
    },
    checkStatus: async () => {
        let status = false;
        try {
            status = (await cloudinary.api.ping()).status === 'ok';
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }

        return status;
    }
});

const { v2 } = require('cloudinary');

export default () => cloudinaryClient(v2);
