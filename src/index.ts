import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { snakeCase } from 'lodash';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import schema from './schema';
import initClients from './utils/init-clients';

initClients().then(({ pgClient }) => {
  const app = express();

  app.use(
    '/status',
    (req, res) => {
      res.sendStatus(200);
    }
  );

  const snakeCaseFieldResolver = (source: any, args: any, contextValue: any, info: any) =>
    source[snakeCase(info.fieldName)];  

  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: ['RS256']
  });

  app.use(
    '/graphql',
    cors(),
    jwtCheck,
    bodyParser.json(),
    graphqlExpress(() => ({
      fieldResolver: snakeCaseFieldResolver,
      schema,
      context: { pgClient }
    }))
  );

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // process.env.PORT needed for heroku to bind to the correct port
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
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
