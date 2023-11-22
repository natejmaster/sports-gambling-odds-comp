import { gql } from '@apollo/client';

// GraphQL queries
const GET_ALL_USERS = gql`
  query {
    users {
      _id
      username
      email
      activeBets {
        _id
        betType
        matchup
        spread
        winner
        total
        endTime
        betStatus
        units
      }
      betHistory {
        _id
        betType
        matchup
        spread
        winner
        total
        endTime
        betStatus
        units
      }
      units
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      activeBets {
        _id
        betType
        matchup
        spread
        winner
        total
        endTime
        betStatus
        units
      }
      betHistory {
        _id
        betType
        matchup
        spread
        winner
        total
        endTime
        betStatus
        units
      }
      units
    }
  }
`;

const GET_ALL_BETS = gql`
  query {
    bets {
      _id
      user {
        _id
        username
        email
      }
      betType
      matchup
      spread
      winner
      total
      endTime
      betStatus
      units
    }
  }
`;

const GET_BET_BY_ID = gql`
  query GetBet($id: ID!) {
    bet(id: $id) {
      _id
      user {
        _id
        username
        email
      }
      betType
      matchup
      spread
      winner
      total
      endTime
      betStatus
      units
    }
  }
`;

export { GET_ALL_USERS, GET_USER_BY_ID, GET_ALL_BETS, GET_BET_BY_ID };
