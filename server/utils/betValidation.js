const Bet = require('../models/Bet');
const User = require('../models/User');
const fetch = require('node-fetch');

// Function to compare spread bets using provided data
function compareSpreadBet(bet, jsonData) {
  const matchedData = jsonData.find(data => data.matchup === bet.matchup);

  if (matchedData) {
    const { winner, spread } = bet;
    const matchedTeamData = matchedData.scores.find(score => score.team === winner);

    if (matchedTeamData) {
      const adjustedScore = matchedTeamData.score + spread;
      const otherTeamData = matchedData.scores.find(score => score.team !== winner);

      if (adjustedScore > otherTeamData.score) {
        bet.betStatus = 'win';
      } else if (adjustedScore === otherTeamData.score) {
        bet.betStatus = 'push';
      } else {
        bet.betStatus = 'loss';
      }

      return bet;
    }
  }

  // If no match or missing data, return bet with 'loss' status
  bet.betStatus = 'loss';
  return bet;
}

// Function to compare overTotal and underTotal bets using provided data
function compareTotalBet(bet, jsonData) {
  const matchedData = jsonData.find(data => data.matchup === bet.matchup);

  if (matchedData) {
    const combinedScore = matchedData.scores.reduce((total, score) => total + parseInt(score.score), 0);

    if (bet.betType === 'overTotal') {
      if (bet.total > combinedScore) {
        bet.betStatus = 'win';
      } else if (bet.total === combinedScore) {
        bet.betStatus = 'push';
      } else {
        bet.betStatus = 'loss';
      }
    } else if (bet.betType === 'underTotal') {
      if (combinedScore > bet.total) {
        bet.betStatus = 'win';
      } else if (combinedScore === bet.total) {
        bet.betStatus = 'push';
      } else {
        bet.betStatus = 'loss';
      }
    }

    return bet;
  }

  // If no match or missing data, return bet with 'loss' status
  bet.betStatus = 'loss';
  return bet;
}

// This function will be responsible for checking and updating bets
async function checkAndUpdateBets() {
  const currentTime = Date.now(); // Current time in milliseconds

  try {
    const expiredBets = await Bet.find({
      endTime: { $lte: currentTime },
      betStatus: 'active'
    }).populate('user');

    const baseURL = process.env.NODE_ENV === 'production' ? 'https://rocky-hollows-26852-54ebc26e9935.herokuapp.com' : 'http://localhost:3001';

    for (const bet of expiredBets) {
      const apiData = await fetch(`${baseURL}/api/results-data`);
      const jsonData = await apiData.json();
    
      let updatedBet = {};
    
      if (bet.betType === 'spread') {
        updatedBet = compareSpreadBet(bet, jsonData);
      } else if (bet.betType === 'overTotal' || bet.betType === 'underTotal') {
        updatedBet = compareTotalBet(bet, jsonData);
      }
    
      bet.betStatus = updatedBet.betStatus;
    
      await bet.save();
    
      // Get the actual User object associated with the bet
      const user = await User.findById(bet.user._id);
    
      // Update bet history and active bets
      user.betHistory.push(bet._id);
      user.activeBets = user.activeBets.filter(activeBetId => activeBetId.toString() !== bet._id.toString());
    
      // Update user's units based on bet status
      if (bet.betStatus === 'win') {
        user.units += 2 * bet.units; // Winning bet doubles the units
      } else if (bet.betStatus === 'push') {
        user.units += bet.units; // Pushed bet returns the initial units
      }
    
      await user.save();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = { checkAndUpdateBets };