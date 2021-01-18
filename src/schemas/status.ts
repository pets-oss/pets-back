import { IResolvers } from 'graphql-tools';
import getStatusesQuery from "../sql-queries/status";

const typeDef = `
extend type Query {
  """
    Get all statuses.
  
    Examples:
  
    statuses(language: "lt")
  """
  statuses(
    "language code"
     language: String!) : [Status]
}

"Represents a status."
type Status {
  "Status id"
  id: String!
  "Status name"
  value: String!
}`;

const resolvers: IResolvers = {
    Query: {
        statuses: async (_, { language }, { pgClient }) => {
            const dbResponse = await pgClient.query(getStatusesQuery(language));
            return dbResponse.rows;
        },
    },
};

export { typeDef, resolvers };
