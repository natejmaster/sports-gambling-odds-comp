const mongoose = require('mongoose');

const { Schema } = mongoose;

const betSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    betType: {
        type: String,
        enum: ['spread', 'overTotal', 'underTotal'],
        required: true,
    },
    matchup: {
        type: String,
        required: true,
    },
    spread: {
        type: Number,
    },
    winner: {
        type: String,
    },
    total: {
        type: Number,
    },
    endTime: {
        type: Number,
        required: true,
    },
    betStatus: {
        type: String,
        enum: ['active', 'win', 'loss', 'push'],
        default: 'active',
        required: true,
    },
    units: {
        type: Number,
        required: true,
        min: 0,
    },
});

const Bet = model('Bet', betSchema);

module.exports = Bet;
