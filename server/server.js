const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const axios = require('axios');

// const { typeDefs, resolvers } = require('./schemas'); // Commented out GraphQL setup
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// const server = new ApolloServer({ // Commented out GraphQL setup
//   typeDefs,
//   resolvers,
// });

const startApolloServer = async () => {
  // await server.start(); // Commented out GraphQL setup
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  // app.use('/graphql', expressMiddleware(server)); // Commented out GraphQL setup

  // New route for fetching NFL odds data
  app.get('/api/bovada-data', async (req, res) => {
    try {
      const response = await axios.get('https://www.bovada.lv/services/sports/event/v2/events/A/description/football/nfl');
      res.json(response.data);
    } catch (error) {
      console.error(error); // Log the error
      res.status(500).json({ error: error.message });
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
      // console.log(`Use GraphQL at http://localhost:${PORT}/graphql`); // Commented out GraphQL setup
    });
  });
};

startApolloServer();