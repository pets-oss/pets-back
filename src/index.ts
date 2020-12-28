import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from './schemas';
import initClients from './utils/init-clients';

initClients().then(({ pgClient }) => {
  const app = express();

  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(() => ({
      schema,
      context: { pgClient },
    }))
  );

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // process.env.PORT needed for heroku to bind to the correct port
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
  });

  const handleShutdown = async () => {
    console.log('Exiting gracefully.');

    let exitCode = 0;

    try {
      await pgClient.disconnect();
    } catch (e) {
      console.log('Failed to exit gracefully.', e);
      exitCode = 1;
    }

    process.exit(exitCode);
  };

  process.on('SIGTERM', handleShutdown);
  process.on('SIGINT', handleShutdown);
});
