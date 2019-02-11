import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import * as Schema from "./schema";
import defaultQuery from "./defaultQuery";

const PORT = process.env.PORT || 3700;
const endpoint = "/graphql";

const apolloServer = new ApolloServer({
  schema: Schema.schema,
  introspection: true,
  playground: {
    tabs: [{ endpoint, query: defaultQuery }]
  }
});

const server = express();
apolloServer.applyMiddleware({ app: server });

server.get("/", (req, res) => res.redirect("/graphql"));

server.listen(PORT, () => {
  console.log(
    `🚀 GraphQL Server is now running on http://localhost:${PORT}/graphql`
  );
});
