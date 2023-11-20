const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const axios = require('axios');
const cors = require('cors'); // Import the cors package

// const { typeDefs, resolvers } = require('./schemas'); //
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// const server = new ApolloServer({ //
//   typeDefs,
//   resolvers,
// });

const startApolloServer = async () => {
  // await server.start(); //

  app.use(cors()); // Enable CORS for all routes
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // app.use('/graphql', expressMiddleware(server)); //

  //
  app.get('/api/bovada-data', async (req, res) => {
    try {
      const response = await axios.get('https://www.bovada.lv/services/sports/event/v2/events/A/description/football/nfl');
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // New route for fetching NFL odds data
  app.get('/api/simplified-bovada-data', async (req, res) => {
    try {
      const response = await axios.get('https://www.bovada.lv/services/sports/event/v2/events/A/description/football/nfl');
  
      // Extracting detailed information for each event
      const simplifiedData = response.data[0]?.events.map((event) => {
        // Find the index of the desired market data by description
        const findMarketIndex = (description) =>
          event.displayGroups[0]?.markets.findIndex((market) => market.description === description);
  
        // Find the index of the point spread market
        const pointSpreadIndex = findMarketIndex('Point Spread');
  
        // Extracting data for the underdog
        const underdogOutcome = event.displayGroups[0]?.markets[pointSpreadIndex]?.outcomes[0];
        const underdog = {
          name: underdogOutcome?.description,
          pointSpread: underdogOutcome?.price?.handicap,
        };
  
        // Extracting data for the favorite
        const favoriteOutcome = event.displayGroups[0]?.markets[pointSpreadIndex]?.outcomes[1];
        const favorite = {
          name: favoriteOutcome?.description,
          pointSpread: favoriteOutcome?.price?.handicap,
        };
  
        // Find the index of the over/under total market
        const totalIndex = findMarketIndex('Total');
  
        // Extracting the total score
        const totalScoreOutcome = event.displayGroups[0]?.markets[totalIndex]?.outcomes[0];
        const totalScore = totalScoreOutcome?.price?.handicap;
  
        return {
          matchup: event.description,
          underdog,
          favorite,
          totalScore,
        };
      });
  
      console.log('Simplified Data:', simplifiedData);
  
      res.json(simplifiedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // console.log(`Use GraphQL at http://localhost:${PORT}/graphql`); //
    });
  });
};

startApolloServer();