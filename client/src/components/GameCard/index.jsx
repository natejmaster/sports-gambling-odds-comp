import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameCard = ({ homeTeam, awayTeam, bookmakers }) => {
  const [bestOdds, setBestOdds] = useState(null);

  useEffect(() => {
    const fetchOddsData = async () => {
      try {
        const response = await axios.get('/api/nfl-odds');
        setBestOdds(findBestOdds(response.data));
      } catch (error) {
        console.error('Error fetching NFL odds:', error);
      }
    };

    fetchOddsData();
  }, []); // Run this effect only once when the component mounts

  // Function to find the best odds for each category
  const findBestOdds = (oddsData) => {
    const bestOdds = {
      pointSpreadTeam1: null,
      pointSpreadTeam2: null,
      over: null,
      under: null,
      moneylineTeam1: null,
      moneylineTeam2: null,
    };

    // Loop through bookmakers
    bookmakers.forEach((bookmaker) => {
      // Loop through markets
      bookmaker.markets.forEach((market) => {
        switch (market.key) {
          case 'h2h':
            // Loop through outcomes
            market.outcomes.forEach((outcome) => {
              if (outcome.name === homeTeam && (bestOdds.moneylineTeam1 === null || outcome.price > bestOdds.moneylineTeam1)) {
                bestOdds.moneylineTeam1 = outcome.price;
              } else if (outcome.name === awayTeam && (bestOdds.moneylineTeam2 === null || outcome.price > bestOdds.moneylineTeam2)) {
                bestOdds.moneylineTeam2 = outcome.price;
              }
            });
            break;
          case 'spreads':
            // Loop through outcomes
            market.outcomes.forEach((outcome) => {
              if (outcome.name === homeTeam && (bestOdds.pointSpreadTeam1 === null || outcome.price > bestOdds.pointSpreadTeam1)) {
                bestOdds.pointSpreadTeam1 = outcome.price;
              } else if (outcome.name === awayTeam && (bestOdds.pointSpreadTeam2 === null || outcome.price > bestOdds.pointSpreadTeam2)) {
                bestOdds.pointSpreadTeam2 = outcome.price;
              }
            });
            break;
          case 'totals':
            // Loop through outcomes
            market.outcomes.forEach((outcome) => {
              if (outcome.name === 'Over' && (bestOdds.over === null || outcome.price > bestOdds.over)) {
                bestOdds.over = outcome.price;
              } else if (outcome.name === 'Under' && (bestOdds.under === null || outcome.price > bestOdds.under)) {
                bestOdds.under = outcome.price;
              }
            });
            break;
          default:
            break;
        }
      });
    });

    return bestOdds;
  };

  return (
    <div className="game-card">
      <div className="teams">
        <span>{awayTeam}</span>
        <span>@</span>
        <span>{homeTeam}</span>
      </div>
      <div className="best-odds">
        {bestOdds ? (
          <div>
            <p>Best Point Spread {awayTeam}: {bestOdds.pointSpreadTeam2}</p>
            <p>Best Point Spread {homeTeam}: {bestOdds.pointSpreadTeam1}</p>
            <p>Best Over: {bestOdds.over}</p>
            <p>Best Under: {bestOdds.under}</p>
            <p>Best Moneyline {awayTeam}: {bestOdds.moneylineTeam2}</p>
            <p>Best Moneyline {homeTeam}: {bestOdds.moneylineTeam1}</p>
          </div>
        ) : (
          <p>Loading odds data...</p>
        )}
      </div>
    </div>
  );
};

export default GameCard;
