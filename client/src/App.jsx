import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from 'react'
import axios from 'axios';
import GameCard from '../src/components/GameCard.jsx';

const App = () => {
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?regions=us&oddsFormat=american&apiKey=62860a168ae81e9e9eaa2e8f832c75f0');
        console.log(response.data);
        setGameData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  return (
    <>
   <Header />
   <div className="app">
      <h1>NFL Game Odds</h1>
      <div className="game-cards">
        {gameData.map((game) => (
          <GameCard
            key={game.id}
            awayTeam={game.away_team}
            homeTeam={game.home_team}
            bookmakers={game.bookmakers}
          />
        ))}
      </div>
    </div>
  
    <Footer />
    </>
  )
}

  

export default App;
