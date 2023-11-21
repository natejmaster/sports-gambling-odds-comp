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

  const renderMatchupButtons = (matchup) => {
    const startTimeInMillis = matchup.startTime;
    const startTimeDate = new Date(startTimeInMillis);

    const options = {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const formattedStartTime = startTimeDate.toLocaleDateString('en-US', options);

    return (
      <tr key={matchup.matchup}>
        <td className='border-royalBlueThin'>{formattedStartTime}</td>
        <td className='border-royalBlueThin'>{matchup.matchup}</td>
        <td className='border-royalBlueThin'>
          <button className='mybtn p-1 rounded'>
            {`${matchup.awayTeam.name} ${matchup.awayTeam.pointSpread > 0 ? `+${matchup.awayTeam.pointSpread}` : matchup.awayTeam.pointSpread}`}
          </button>
        </td>
        <td className='border-royalBlueThin'>
          <button className='mybtn p-1 rounded'>
            {`${matchup.homeTeam.name} ${matchup.homeTeam.pointSpread > 0 ? `+${matchup.homeTeam.pointSpread}` : matchup.homeTeam.pointSpread}`}
          </button>
        </td>
        <td className='border-royalBlueThin'>
          <button className='mybtn p-1 rounded'>{`Over ${matchup.totalScore}`}</button>
        </td>
        <td className='border-royalBlueThin'>
          <button className='mybtn p-1 rounded'>{`Under ${matchup.totalScore}`}</button>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex flex-col white-bg mt-4 mx-5 rounded-xl border-royalBlue items-center justify-center mb-32">
      <h2 className="text-3xl heading">Matchups</h2>
      <table>
        <thead>
          <tr>
            <th className='royalBlue'>Start Time (CT)</th>
            <th className='royalBlue'>Matchup</th>
            <th className='royalBlue'>Away</th>
            <th className='royalBlue'>Home</th>
            <th className='royalBlue'>Over</th>
            <th className='royalBlue'>Under</th>
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