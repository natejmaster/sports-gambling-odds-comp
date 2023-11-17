const mongoose = require('mongoose');

const UserStatisticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This will connect the userId to the correct user from User.js
        required: true,
    },
    totalBets: {
        type: Number,
        default: 0,
    },
    totalWins: {
        type: Number,
        default: 0,
    },
    totalLosses: {
        type: Number,
        default: 0,
    },
    totalPoints: {
        type: Number,
        default: 0,
    },
});