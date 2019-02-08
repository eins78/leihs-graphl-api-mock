import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import * as Schema from "./schema";

const PORT = process.env.PORT || 3700;

const apolloServer = new ApolloServer({
<<<<<<< HEAD
  schema: Schema.schema
});
=======
  schema: Schema.schema,
  introspection: true,
  playground: {
    tabs: [{ query: `#yo` }, { query: `#yo` }]
  }
})
>>>>>>> wip server

const server = express();
apolloServer.applyMiddleware({ app: server });

server.get("/", (req, res) => res.redirect("/graphql"));

server.listen(PORT, () => {
  console.log(
    `🚀 GraphQL Server is now running on http://localhost:${PORT}/graphql`
  );
});
