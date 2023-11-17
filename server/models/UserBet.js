const mongoose = require('mongoose');

const UserStatisticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This will connect the userId to the correct user from User.js
        required: true,
    },
})