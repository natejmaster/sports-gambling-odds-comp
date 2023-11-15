const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const axios = require('axios');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

  // New route for fetching NFL odds data
  app.get('/api/nfl-odds', async (req, res) => {
    try {
      const response = await axios.get(
        'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/',
        {
          params: {
            regions: 'us',
            oddsFormat: 'american',
            apiKey: '62860a168ae81e9e9eaa2e8f832c75f0',
          },
        }
      );

      const oddsData = response.data; // Adjust this based on the structure of the API response

      res.json(oddsData);
    } catch (error) {
      console.error('Error fetching NFL odds:', error);
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
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
