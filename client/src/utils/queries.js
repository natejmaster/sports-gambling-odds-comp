import { gql } from "@apollo/client";

// GraphQL queries
export const QUERY_ME = gql`
  query me {
    me {
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

export const QUERY_USERS = gql`
  query users {
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
