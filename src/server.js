import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import * as Schema from './schema'

const PORT = process.env.PORT || 3700

const apolloServer = new ApolloServer({
  schema: Schema.schema
})

const server = express()
apolloServer.applyMiddleware({ app: server })

server.listen(PORT, () => {
  console.log(
    `🚀 GraphQL Server is now running on http://localhost:${PORT}/graphql`
  )
})
