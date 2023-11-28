const { compareSpreadBet, compareTotalBet } = require('../utils/betValidation');
const fetch = require('node-fetch');

describe('Bet Validation Functions', () => {
  let jsonData; // To store the fetched data
  
  beforeAll(async () => {
    // Fetch the JSON data from the API endpoint
    const response = await fetch('http://localhost:3001/api/results-data');
    jsonData = await response.json();
  });

    describe('Spread Bet Validation', () => {
        test('Spread Bet Wins', () => {
          // Mock bet data for a winning spread bet
          const bet = {
            matchup: "Green Bay Packers at Detroit Lions",
            winner: "Green Bay Packers",
            spread: 3, // Spread of 3 points
            betType: "spread"
          };
    
          const result = compareSpreadBet(bet, jsonData);
          expect(result.betStatus).toBe('win');
        });
    
        test('Spread Bet Pushes', () => {
          // Mock bet data for a pushing spread bet
          const bet = {
            matchup: "Green Bay Packers at Detroit Lions",
            winner: "Detroit Lions",
            spread: 7, // Spread of 7 points
            betType: "spread"
          };
    
          const result = compareSpreadBet(bet, jsonData);
          expect(result.betStatus).toBe('push');
        });
    
        test('Spread Bet Loses', () => {
          // Mock bet data for a losing spread bet
          const bet = {
            matchup: "Green Bay Packers at Detroit Lions",
            winner: "Detroit Lions",
            spread: 5, // Spread of 5 points
            betType: "spread"
          };
    
          const result = compareSpreadBet(bet, jsonData);
          expect(result.betStatus).toBe('loss');
        });
      });

  describe('Total Bet Validation', () => {
    test('OverTotal Bet Wins', () => {
      // Mock bet data for a winning overTotal bet
      const bet = {
        matchup: "Miami Dolphins at New York Jets",
        total: 30,
        betType: "overTotal"
      };

      const result = compareTotalBet(bet, jsonData);
      expect(result.betStatus).toBe('win');
    });

    test('OverTotal Bet Pushes', () => {
      // Mock bet data for a pushing overTotal bet
      const bet = {
        matchup: "Buffalo Bills at Philadelphia Eagles",
        total: 71,
        betType: "overTotal"
      };

      const result = compareTotalBet(bet, jsonData);
      expect(result.betStatus).toBe('push');
    });

    test('OverTotal Bet Loses', () => {
      // Mock bet data for a losing overTotal bet
      const bet = {
        matchup: "San Francisco 49ers at Seattle Seahawks",
        total: 45,
        betType: "overTotal"
      };

      const result = compareTotalBet(bet, jsonData);
      expect(result.betStatus).toBe('loss');
    });

    test('UnderTotal Bet Wins', () => {
      // Mock bet data for a winning underTotal bet
      const bet = {
        matchup: "Green Bay Packers at Detroit Lions",
        total: 52,
        betType: "underTotal"
      };

      const result = compareTotalBet(bet, jsonData);
      expect(result.betStatus).toBe('win');
    });

    test('UnderTotal Bet Pushes', () => {
      // Mock bet data for a pushing underTotal bet
      const bet = {
        matchup: "Washington Commanders at Dallas Cowboys",
        total: 55,
        betType: "underTotal"
      };

      const result = compareTotalBet(bet, jsonData);
      expect(result.betStatus).toBe('push');
    });

    test('UnderTotal Bet Loses', () => {
      // Mock bet data for a losing underTotal bet
      const bet = {
        matchup: "Jacksonville Jaguars at Houston Texans",
        total: 40,
        betType: "underTotal"
      };

      const result = compareTotalBet(bet, jsonData);
      expect(result.betStatus).toBe('loss');
    });
  });
});
