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

  app.listen(8081, () => {
    console.log('Go to http://localhost:8081/graphiql to run queries!');
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
