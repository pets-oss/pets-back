import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { snakeCase } from 'lodash';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { graphqlUploadExpress } from 'graphql-upload';
import schema from './schema';
import initClients from './utils/init-clients';
import { version } from '../package.json';

const { ApolloServer } = require('apollo-server-express');

initClients().then(({ pgClient, cloudinaryClient }) => {
    const app = express();

    app.use('/status', async (req, res) => {

        const databaseStatus = (await pgClient.query({
            text: 'SELECT TRUE AS OK'
        })).rows?.[0].ok;

        const cloudinaryStatus = await cloudinaryClient.checkStatus();

        res.send({
            status: databaseStatus && cloudinaryStatus ? 'ok' : 'not ok',
            database: databaseStatus ? 'ok' : 'not ok',
            cloudinary: cloudinaryStatus ? 'ok' : 'not ok',
            version
        });
    });

    const snakeCaseFieldResolver = (
        source: any,
        args: any,
        contextValue: any,
        info: any
    ) => source[snakeCase(info.fieldName)];

    const jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
        }),
        audience: process.env.AUTH0_AUDIENCE,
        issuer: process.env.AUTH0_DOMAIN,
        algorithms: ['RS256'],
    });

    app.use('/graphql', bodyParser.json());
    app.use(cors());

    if (process.env.AUTH_DISABLED !== 'true') {
        app.use('/graphql', jwtCheck);
    }

    app.use(
        '/graphql',
        graphqlUploadExpress({
            maxFileSize: 10000000, // 10 MB
            maxFiles: 20,
        })
    );

    const server = new ApolloServer({
        uploads: false,
        schema,
        fieldResolver: snakeCaseFieldResolver,
        context: { pgClient, cloudinaryClient },
    });

    server.applyMiddleware({ app });

    // process.env.PORT needed for heroku to bind to the correct port
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Go to http://localhost:${PORT}/graphql to run queries!`);
    });

    const handleShutdown = async () => {
        // eslint-disable-next-line no-console
        console.log('Exiting gracefully.');

        let exitCode = 0;

        try {
            await pgClient.disconnect();
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('Failed to exit gracefully.', e);
            exitCode = 1;
        }

        process.exit(exitCode);
    };

    process.on('SIGTERM', handleShutdown);
    process.on('SIGINT', handleShutdown);
});
