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
  
      const excludedTeams = [31,32];
  
      for (let i = 1; i <= 34; i++) {
        if (excludedTeams.includes(i)) {
          continue; // Skip conference teams
        }
  
        const teamData = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${i}`);
        const team = teamData.data.team;
  
        const logoLink = (Array.isArray(team.logos) && team.logos.length > 0)
          ? team.logos.find(logo => logo.rel && logo.rel.includes('full'))?.href
          : null;
  
        const totalRecordItem = team.record?.items?.find(item => item.type === 'total');
        const recordSummary = totalRecordItem ? totalRecordItem.summary : 'N/A';
  
        const teamInfo = {
          id: i,
          fullName: team.displayName,
          logoLink: logoLink,
          record: recordSummary,
        };
  
        try {
          const teamStatsData = await axios.get(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/types/2/teams/${i}/statistics?lang=en&region=us`);
          const teamStats = teamStatsData.data;
    
          const categories = teamStats.splits.categories;
    
          // Extracting passing, rushing, and scoring stats
          const passingYardsPerGame = categories[1].stats.find(stat => stat.name === 'passingYardsPerGame');
          const rushingYardsPerGame = categories[2].stats.find(stat => stat.name === 'rushingYardsPerGame');
          const totalPointsPerGame = categories[9].stats.find(stat => stat.name === 'totalPointsPerGame');
    
          // Add these specific statistics to the teamInfo object and round to the nearest tenth
          teamInfo.passingYardsPerGame = passingYardsPerGame ? parseFloat(passingYardsPerGame.value).toFixed(1) : 'N/A';
          teamInfo.rushingYardsPerGame = rushingYardsPerGame ? parseFloat(rushingYardsPerGame.value).toFixed(1) : 'N/A';
          teamInfo.pointsPerGame = totalPointsPerGame ? parseFloat(totalPointsPerGame.value).toFixed(1) : 'N/A';
    
        } catch (error) {
          console.error(`Error fetching statistics for team ${i}:`, error);
          // Set default value for statistics in case of error
          teamInfo.passingYardsPerGame = 'N/A';
          teamInfo.rushingYardsPerGame = 'N/A';
          teamInfo.pointsPerGame = 'N/A';
        }
    
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