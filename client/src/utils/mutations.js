import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BET = gql`
  mutation addBet(
    $betType: String!
    $matchup: String!
    $spread: Int
    $winner: String
    $total: Int
    $endTime: Int!
    $betStatus: String!
    $units: Int!
  ) {
    addBet(
      betType: $betType
      matchup: $matchup
      spread: $spread
      winner: $winner
      total: $total
      endTime: $endTime
      betStatus: $betStatus
      units: $units
    ) {
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
  }
`;