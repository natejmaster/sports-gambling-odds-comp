import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GameCards() {
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/bovada-data');
        console.log(response.data);
        setGameData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="app">
      <h1>NFL Game Odds</h1>
      <div className="game-cards">
        {gameData.map((game, index) => (
          <div key={index}>
            <p>Description: {game.description}</p>
            {/* Include other data as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}