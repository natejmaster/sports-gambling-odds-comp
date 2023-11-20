import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchupsComponent = () => {
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    // Fetch matchups data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/simplified-bovada-data');
        setMatchups(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const renderMatchupButtons = (matchup) => (
    <div>
      <button>
        {`${matchup.awayTeam.name} ${matchup.awayTeam.pointSpread > 0 ? `+${matchup.awayTeam.pointSpread}` : matchup.awayTeam.pointSpread}`}
      </button>
      <button>
        {`${matchup.homeTeam.name} ${matchup.homeTeam.pointSpread > 0 ? `+${matchup.homeTeam.pointSpread}` : matchup.homeTeam.pointSpread}`}
      </button>
      <button>{`Over ${matchup.totalScore}`}</button>
      <button>{`Under ${matchup.totalScore}`}</button>
    </div>
  );

  return (
    <div>
      <h2>Matchups</h2>
      {matchups.map((matchup, index) => (
        <div key={index}>
          <p>{matchup.matchup}</p>
          {renderMatchupButtons(matchup)}
        </div>
      ))}
    </div>
  );
};

export default MatchupsComponent;