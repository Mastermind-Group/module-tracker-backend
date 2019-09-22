const { buildSchema } = require('graphql')

// never return a password
module.exports = buildSchema(`

type User {
    _id: ID!
    username: String!
}

type AuthData {
    _id: ID!
    token: String!
}

input InUser {
    username: String!
    password: String!
}

type RootQuery {
    login(username: String!, password: String!): AuthData!
    users: [User!]
}

type RootMutation {
    createUser(inUser: InUser): AuthData!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)
