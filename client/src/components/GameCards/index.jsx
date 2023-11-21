import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameCards = () => {
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/simplified-bovada-data');
        setMatchups(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderMatchupButtons = (matchup) => (
    <tr key={matchup.matchup}>
      <td>{matchup.matchup}</td>
      <td>
        <button>
          {`${matchup.awayTeam.name} ${matchup.awayTeam.pointSpread > 0 ? `+${matchup.awayTeam.pointSpread}` : matchup.awayTeam.pointSpread}`}
        </button>
      </td>
      <td>
        <button>
          {`${matchup.homeTeam.name} ${matchup.homeTeam.pointSpread > 0 ? `+${matchup.homeTeam.pointSpread}` : matchup.homeTeam.pointSpread}`}
        </button>
      </td>
      <td>
        <button>{`Over ${matchup.totalScore}`}</button>
      </td>
      <td>
        <button>{`Under ${matchup.totalScore}`}</button>
      </td>
    </tr>
  );

  return (
    <div>
      <h2>Matchups</h2>
      <table>
        <thead>
          <tr>
            <th>Matchup</th>
            <th>Away Team</th>
            <th>Home Team</th>
            <th>Over</th>
            <th>Under</th>
          </tr>
        </thead>
        <tbody>
          {matchups.map((matchup) => renderMatchupButtons(matchup))}
        </tbody>
      </table>
    </div>
  );
};

export default GameCards;