const { AuthenticationError } = require('apollo-server-express');
const { User, Bet } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('activeBets')
          .populate('betHistory');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },

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
          try {
            if (context.user) {
              const bet = await Bet.create({
                betType,
                matchup,
                spread,
                winner,
                total,
                endTime,
                betStatus,
                units,
                user: context.user._id,
              });

              console.log('Created Bet:', bet);

              const user = await User.findById(context.user._id);

              if (user.units < units) {
                throw new Error('Insufficient Unit Balance for this Bet!! Please Try Again.')
              }
              user.units -= units;
              await user.save();
              
              await User.findByIdAndUpdate(
                context.user._id,
                { $push: { activeBets: bet._id } },
                { new: true }
              );

              const populatedUser = await User.findById(context.user._id).populate('activeBets');
              console.log('Updated User with Bet Details:', populatedUser);
              
              return bet;
            } else {
              throw new AuthenticationError('You need to be logged in!');
            }
          } catch (error) {
            console.error("Error in addBet resolver:", error);
            throw error;
          }
        },               
    }
  };


module.exports = resolvers;