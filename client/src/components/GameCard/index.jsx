import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameCard = ({ homeTeam, awayTeam, bookmakers }) => {
  const [bestOdds, setBestOdds] = useState(null);

  useEffect(() => {
    const findBestOdds = (oddsData) => {
      const bestOdds = {
        pointSpreadTeam1: null,
        pointSpreadTeam2: null,
        over: null,
        under: null,
        moneylineTeam1: null,
        moneylineTeam2: null,
      };

      bookmakers.forEach((bookmaker) => {
        bookmaker.markets.forEach((market) => {
          switch (market.key) {
            case 'h2h':
              market.outcomes.forEach((outcome) => {
                if (outcome.name === homeTeam && (bestOdds.moneylineTeam1 === null || outcome.price > bestOdds.moneylineTeam1)) {
                  bestOdds.moneylineTeam1 = outcome.price;
                } else if (outcome.name === awayTeam && (bestOdds.moneylineTeam2 === null || outcome.price > bestOdds.moneylineTeam2)) {
                  bestOdds.moneylineTeam2 = outcome.price;
                }
              });
              break;
            case 'spreads':
              market.outcomes.forEach((outcome) => {
                if (outcome.name === homeTeam && (bestOdds.pointSpreadTeam1 === null || outcome.price > bestOdds.pointSpreadTeam1)) {
                  bestOdds.pointSpreadTeam1 = outcome.price;
                } else if (outcome.name === awayTeam && (bestOdds.pointSpreadTeam2 === null || outcome.price > bestOdds.pointSpreadTeam2)) {
                  bestOdds.pointSpreadTeam2 = outcome.price;
                }
              });
              break;
            case 'totals':
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

    const fetchOddsData = async () => {
      try {
        const response = await axios.get('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?regions=us&oddsFormat=american&apiKey=62860a168ae81e9e9eaa2e8f832c75f0');
        const odds = findBestOdds(response.data);
        setBestOdds(odds);
      } catch (error) {
        console.error('Error fetching NFL odds:', error);
      }
    };

    fetchOddsData();
  }, [homeTeam, awayTeam, bookmakers]); // Include necessary dependencies for useEffect

  const renderOddsButtons = () => {
    if (!bestOdds) {
      return <p>Loading odds data...</p>;
    }

    return (
      <div className="odds-grid">
        <button>Best Point Spread {awayTeam}: {bestOdds.pointSpreadTeam2}</button>
        <button>Best Point Spread {homeTeam}: {bestOdds.pointSpreadTeam1}</button>
        <button>Best Over: {bestOdds.over}</button>
        <button>Best Under: {bestOdds.under}</button>
        <button>Best Moneyline {awayTeam}: {bestOdds.moneylineTeam2}</button>
        <button>Best Moneyline {homeTeam}: {bestOdds.moneylineTeam1}</button>
      </div>
    );
  };

  return (
    <div className="game-card">
      <div className="teams">
        <span>{awayTeam}</span>
        <span>@</span>
        <span>{homeTeam}</span>
      </div>
      <div className="best-odds">
        {renderOddsButtons()}
      </div>
    </div>
  );
};

export default GameCard;
