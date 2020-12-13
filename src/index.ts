import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import { schema } from './schemas';
import initClients from './utils/init-clients';

initClients().then(({ pgClient }) => {
  // Initialize the app
  const app = express();

  // The GraphQL endpoint
  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(() => ({
      schema,
      context: { pgClient },
    }))
  );

  // GraphiQL, a visual editor for queries
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // Start the server
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
