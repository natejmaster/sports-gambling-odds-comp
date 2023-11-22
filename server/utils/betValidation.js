const Bet = require('../models/Bet');
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
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  try {
    // Find bets where endTime <= current time and betStatus is 'active'
    const expiredBets = await Bet.find({
      endTime: { $lte: currentTime },
      betStatus: 'active'
    }).populate('user'); // Assuming 'user' field in Bet is populated

    for (const bet of expiredBets) {
      const apiData = await fetch('/api/results-data');
      const jsonData = await apiData.json();

      if (bet.betType === 'spread') {
        const result = compareSpreadBet(bet, jsonData);
        // Handle result for spread bet
      } else if (bet.betType === 'overTotal' || bet.betType === 'underTotal') {
        const result = compareTotalBet(bet, jsonData);
        // Handle result for overTotal or underTotal bet
      }

      await bet.save();

      const updatedBet = new Bet({
        user: bet.user._id,
        betType: bet.betType,
        betStatus: bet.betStatus,
        units: bet.units,
      });

      bet.user.betHistory.push(updatedBet);
      await bet.user.save();

      if (bet.betStatus === 'win') {
        bet.user.units += bet.betType === 'win' ? 2 * bet.units : bet.units;
      } else if (bet.betStatus === 'push' && bet.betType === 'push') {
        bet.user.units += bet.units;
      }
      await bet.user.save();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Periodically check for expired bets and trigger the update process
setInterval(checkAndUpdateBets, 60000);

// Export the function for usage
module.exports = { checkAndUpdateBets };

  