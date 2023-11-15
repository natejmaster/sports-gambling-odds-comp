import React from 'react';

const GameCard = () => {
  return (
    <div className="game-card">
      <iframe
        title="Sports Odds Widget"
        style={{ width: '20rem', height: '25rem', border: '1px solid black' }}
        src="https://widget.the-odds-api.com/v1/sports/americanfootball_nfl/events/?accessKey=wk_e329ab8c41b396a42de220849be3cbe9&bookmakerKeys=draftkings&oddsFormat=american&markets=h2h%2Cspreads%2Ctotals&marketNames=h2h%3AMoneyline%2Cspreads%3ASpreads%2Ctotals%3AOver%2FUnder"
      ></iframe>
    </div>
  );
};

export default GameCard;