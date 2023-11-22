const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    activeBets: [Bet]
    betHistory: [Bet]
    units: Int

  }
  type Bet {
    _id: ID!
    betType: String!
    matchup: String!
    spread: Int
    winner: String
    total: Int
    endTime: Int!
    betStatus: String!
    units: Int!
  }
  type Auth {
    token: ID!
    user: User
  }

  input BetInput {
    betType: String!
    matchup: String!
    spread: Float
    winner: String
    total: Float
    endTime: Int!
    betStatus: String!
    units: Int!
  }
type Query {
  me: User
  users: [User]
  user(username: String!): User

}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBet(betType: String!, matchup: String!, spread: Float, winner: String, total: Float, endTime: Int!, betStatus: String!, units: Int!): Bet

  }
`;

module.exports = typeDefs;
