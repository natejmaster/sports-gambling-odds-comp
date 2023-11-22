import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

// export const QUERY_BETS = gql`
//   query getBets {
//     bets {
//       _id
//       betType
//       matchup
//       spread
//       winner
//       total
//       endTime
//       betStatus
//       units
//     }
//   }
// `;

// export const QUERY_SINGLE_BET = gql`
//   query getSingleBet($betId: ID!) {
//     bet(betId: $betId) {
//       _id
//       betType
//       matchup
//       spread
//       winner
//       total
//       endTime
//       betStatus
//       units
//     }
//   }
// `;