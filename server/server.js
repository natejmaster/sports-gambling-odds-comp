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

  // New route for fetching NFL odds data
  app.get('/api/simplified-bovada-data', async (req, res) => {
    try {
      const response = await axios.get('https://www.bovada.lv/services/sports/event/v2/events/A/description/football/nfl');

      // Log the full response to see what's coming from Bovada
      console.log('Full Bovada API Response:', response.data);

      // Extracting the "events" data and simplifying it
      const eventsData = response.data[0]?.events || [];
      console.log('Extracted Events Data:', eventsData);

      const simplifiedData = eventsData.map((event) => {
        return {
          matchup: event.description,
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