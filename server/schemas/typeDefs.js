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
type AllUsers {
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
    betType: String
    matchup: String!
    spread: Float
    winner: String
    total: Int
    endTime: Float
    betStatus: String
    units: Int!
  }
  type Auth {
    token: ID!
    user: User
  }

  input BetInput {
    betType: String
    matchup: String!
    spread: Float
    winner: String
    total: Float
    endTime: Float
    betStatus: String!
    units: Int!
  }
type Query {
  me: User
  user(username: String!): User
  users: [AllUsers]

}

  type Mutation {
    removeAllBets: [Bet]
  removeBet(betId: ID!): Bet
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBet(betType: String!, matchup: String!, spread: Float, winner: String, total: Float, endTime: Float!, betStatus: String, units: Int!): Bet

  }
`;

module.exports = typeDefs;
