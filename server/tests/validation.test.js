const { compareSpreadBet, compareTotalBet } = require('../utils/betValidation');

describe('Bet Validation Functions', () => {
  // Mock data for testing
  const jsonData = [
    {
    "matchup": "Green Bay Packers at Detroit Lions",
    "scores": [
    {
    "team": "Detroit Lions",
    "score": "22"
    },
    {
    "team": "Green Bay Packers",
    "score": "29"
    }
    ]
    },
    {
    "matchup": "Washington Commanders at Dallas Cowboys",
    "scores": [
    {
    "team": "Dallas Cowboys",
    "score": "45"
    },
    {
    "team": "Washington Commanders",
    "score": "10"
    }
    ]
    },
    {
    "matchup": "San Francisco 49ers at Seattle Seahawks",
    "scores": [
    {
    "team": "Seattle Seahawks",
    "score": "13"
    },
    {
    "team": "San Francisco 49ers",
    "score": "31"
    }
    ]
    },
    {
    "matchup": "Miami Dolphins at New York Jets",
    "scores": [
    {
    "team": "New York Jets",
    "score": "13"
    },
    {
    "team": "Miami Dolphins",
    "score": "34"
    }
    ]
    },
    {
    "matchup": "New Orleans Saints at Atlanta Falcons",
    "scores": [
    {
    "team": "Atlanta Falcons",
    "score": "24"
    },
    {
    "team": "New Orleans Saints",
    "score": "15"
    }
    ]
    },
    {
    "matchup": "Pittsburgh Steelers at Cincinnati Bengals",
    "scores": [
    {
    "team": "Cincinnati Bengals",
    "score": "10"
    },
    {
    "team": "Pittsburgh Steelers",
    "score": "16"
    }
    ]
    },
    {
    "matchup": "Carolina Panthers at Tennessee Titans",
    "scores": [
    {
    "team": "Tennessee Titans",
    "score": "17"
    },
    {
    "team": "Carolina Panthers",
    "score": "10"
    }
    ]
    },
    {
    "matchup": "Tampa Bay Buccaneers at Indianapolis Colts",
    "scores": [
    {
    "team": "Indianapolis Colts",
    "score": "27"
    },
    {
    "team": "Tampa Bay Buccaneers",
    "score": "20"
    }
    ]
    },
    {
    "matchup": "New England Patriots at New York Giants",
    "scores": [
    {
    "team": "New York Giants",
    "score": "10"
    },
    {
    "team": "New England Patriots",
    "score": "7"
    }
    ]
    },
    {
    "matchup": "Jacksonville Jaguars at Houston Texans",
    "scores": [
    {
    "team": "Houston Texans",
    "score": "21"
    },
    {
    "team": "Jacksonville Jaguars",
    "score": "24"
    }
    ]
    },
    {
    "matchup": "Cleveland Browns at Denver Broncos",
    "scores": [
    {
    "team": "Denver Broncos",
    "score": "29"
    },
    {
    "team": "Cleveland Browns",
    "score": "12"
    }
    ]
    },
    {
    "matchup": "Los Angeles Rams at Arizona Cardinals",
    "scores": [
    {
    "team": "Arizona Cardinals",
    "score": "14"
    },
    {
    "team": "Los Angeles Rams",
    "score": "37"
    }
    ]
    },
    {
    "matchup": "Kansas City Chiefs at Las Vegas Raiders",
    "scores": [
    {
    "team": "Las Vegas Raiders",
    "score": "17"
    },
    {
    "team": "Kansas City Chiefs",
    "score": "31"
    }
    ]
    },
    {
    "matchup": "Buffalo Bills at Philadelphia Eagles",
    "scores": [
    {
    "team": "Philadelphia Eagles",
    "score": "37"
    },
    {
    "team": "Buffalo Bills",
    "score": "34"
    }
    ]
    },
    {
    "matchup": "Baltimore Ravens at Los Angeles Chargers",
    "scores": [
    {
    "team": "Los Angeles Chargers",
    "score": "10"
    },
    {
    "team": "Baltimore Ravens",
    "score": "20"
    }
    ]
    }
    ];

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
