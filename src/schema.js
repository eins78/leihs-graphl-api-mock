// graphql
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  MockList
} from 'graphql-tools'
import gql from 'graphql-tag'

// graphql extensions
import { GraphQLDateTime } from 'graphql-iso-date'
// import GraphQLJSON from 'graphql-type-json'

// helpers for data mocking etc:
import f from 'lodash'
import titleCase from 'ap-style-title-case'
import casual from 'casual-browserify'
import words from 'categorized-words'

export const typeDefs = gql`
  scalar DateTime

  enum displayNameStyle {
    FULL
    SHORT
    INITIALS
  }

  type User {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Model {
    id: ID!
    name: String!
    borrowable: Boolean!
    retired: Boolean!
  }

  """
  Top-Level Category, only contains sub-Categories.
  """
  type ModelMainCategory {
    id: ID!
    name: String!
    subCategories: [ModelCategory!]!
  }

  """
  Category, can contain Categories and/or Models.
  Always has at least 1 [MainCategory] as "parent".
  """
  type ModelCategory {
    id: ID!
    name: String!
    subCategories: [ModelCategory!]!
    parentCategories: [ModelCategory!]!
    models: [Model!]
  }

  type Query {
    users(limit: Int): [User!]!
    modelCategories(limit: Int): [ModelMainCategory!]!
  }
`

export const resolvers = {
  DateTime: GraphQLDateTime
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })

const mocks = () => ({
  // Here you could customize the mocks.
  // If you leave it empty, the default is used.
  // You can read more about mocking here: http://bit.ly/2pOYqXF
  DateTime: () => casual.moment.toDate()

})

// fake data helpers
const samp = list => f.first(f.shuffle(list))

const mockPaginatedListResolver = (o, { limit }) => new MockList([limit, limit])

const timestamps = () =>
  [casual.moment.toDate(), casual.moment.toDate()]
    .sort((a, b) => a > b)
    .reduce((m, d, i) => ({ ...m, [i < 1 ? 'createdAt' : 'updatedAt']: d }), {})


// This function call adds the mocks to your schema!
addMockFunctionsToSchema({ schema, mocks: mocks() })
