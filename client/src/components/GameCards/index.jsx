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
    <tr key={matchup.matchup} className='border-blue'>
      <td className='border-blue roaylBlue p-2'>{matchup.matchup}</td>
      <td className='border-blue royalBlue p-2'>
        <button>
          {`${matchup.awayTeam.name} ${matchup.awayTeam.pointSpread > 0 ? `+${matchup.awayTeam.pointSpread}` : matchup.awayTeam.pointSpread}`}
        </button>
      </td>
      <td className='border-blue royalBlue p-2'>
        <button>
          {`${matchup.homeTeam.name} ${matchup.homeTeam.pointSpread > 0 ? `+${matchup.homeTeam.pointSpread}` : matchup.homeTeam.pointSpread}`}
        </button>
      </td>
      <td className='border-blue royalBlue p-2'>
        <button>{`Over ${matchup.totalScore}`}</button>
      </td>
      <td className='border-blue royalBlue p-2'>
        <button>{`Under ${matchup.totalScore}`}</button>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col white-bg mt-4 mx-5 rounded-xl border-royalBlue items-center justify-center mb-32">
      <h2 className="text-3xl heading">Matchups</h2>
      <table>
        <thead>
          <tr>
            <th className="text-lg royalBlue">Matchup</th>
            <th className="text-lg royalBlue">Away Team</th>
            <th className="text-lg royalBlue">Home Team</th>
            <th className="text-lg royalBlue">Over</th>
            <th className="text-lg royalBlue">Under</th>
          </tr>
        </thead>
        <tbody>
          {matchups.map((matchup) => renderMatchupButtons(matchup))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchupsComponent;