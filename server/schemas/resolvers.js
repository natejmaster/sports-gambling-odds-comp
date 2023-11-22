const { AuthenticationError } = require('apollo-server-express');
const { User, Bet } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw AuthenticationError;
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw AuthenticationError;
          }
    
          const token = signToken(user);
    
          return { token, user };
        },
        
        addBet: async (parent, { betType, matchup, spread, winner, total, endTime, betStatus, units }, context) => {
          if (context.user) {
            const bet = await Bet.create({ betType, matchup, spread, winner, total, endTime, betStatus, units });
            const user = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { bets: bet._id } },
              { new: true }
            );
            return bet;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
    }
  };


module.exports = resolvers;
