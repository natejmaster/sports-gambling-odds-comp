const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const { authMiddleware } = require('./utils/auth');
const { checkAndUpdateBets } = require('./utils/betValidation');
const fs = require('fs');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const backupFilePath = path.join(__dirname, 'backup.json');

const saveDataToFile = (data) => {
  fs.writeFile(backupFilePath, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Backup data saved.');
  });
};

const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(backupFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading backup file:', err);
    return null;
  }
};

let backupData = readDataFromFile();

const startApolloServer = async () => {
  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  app.get('/api/bovada-data', async (req, res) => {
    try {
      const response = await axios.get('https://www.bovada.lv/services/sports/event/v2/events/A/description/football/nfl');
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/simplified-bovada-data', async (req, res) => {
    try {
      const response = await axios.get('https://www.bovada.lv/services/sports/event/v2/events/A/description/football/nfl');
  
      const simplifiedData = response.data[0]?.events.map((event) => {
        const startTime = event.startTime;
        const endTime = startTime + (5 * 60 * 60 * 1000);
        
        const findMarketIndex = (description) =>
          event.displayGroups[0]?.markets.findIndex((market) => market.description === description);

        const pointSpreadIndex = findMarketIndex('Point Spread');
        const awayTeamOutcome = event.displayGroups[0]?.markets[pointSpreadIndex]?.outcomes[0];
        const awayTeam = {
          name: awayTeamOutcome?.description,
          pointSpread: awayTeamOutcome?.price?.handicap,
        };

        const homeTeamOutcome = event.displayGroups[0]?.markets[pointSpreadIndex]?.outcomes[1];
        const homeTeam = {
          name: homeTeamOutcome?.description,
          pointSpread: homeTeamOutcome?.price?.handicap,
        };

        const totalIndex = findMarketIndex('Total');
        const totalScoreOutcome = event.displayGroups[0]?.markets[totalIndex]?.outcomes[0];
        const totalScore = totalScoreOutcome?.price?.handicap;
        
        return {
          matchup: event.description,
          awayTeam,
          homeTeam,
          totalScore,
          startTime,
          endTime,
        };
      });

      if (Array.isArray(simplifiedData) && simplifiedData.length > 0) {
        backupData = simplifiedData;
        saveDataToFile(simplifiedData);
      } else if (!Array.isArray(simplifiedData) && backupData) {
        res.json(backupData);
        return;
      }

      res.json(simplifiedData);
    } catch (error) {
      console.error(error);
      const backup = readDataFromFile();
      if (backup) {
        res.json(backup);
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });

  app.get('/api/results-data', async (req, res) => {
    try {
      const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
  
      const gamesData = response.data?.events.map((event) => {
        const competitors = event?.competitions[0]?.competitors;
        const scores = competitors.map((competitor) => ({
          team: competitor.team.displayName,
          score: competitor.score,
        }));
        
        return {
          matchup: event.name,
          scores,
        };
      });
  
      res.json(gamesData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/team-info', async (req, res) => {
    try {
      const teamInfos = [];
  
      for (let i = 1; i <= 34; i++) {
        const teamData = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${i}`);
        const team = teamData.data.team;
  
        // Check if logos exist and are an array before accessing 'find'
        const logoLink = (Array.isArray(team.logos) && team.logos.length > 0)
          ? team.logos.find(logo => logo.rel && logo.rel.includes('full'))?.href
          : null;
  
        // Check if 'record' and 'items' exist before using 'find'
        const totalRecordItem = team.record?.items?.find(item => item.type === 'total');
        const recordSummary = totalRecordItem ? totalRecordItem.summary : 'N/A';
  
        const teamInfo = {
          fullName: team.displayName,
          logoLink: logoLink,
          record: recordSummary,
        };
  
        teamInfos.push(teamInfo);
      }
  
      res.json(teamInfos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  setInterval(checkAndUpdateBets, 60000);
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
};

startApolloServer();