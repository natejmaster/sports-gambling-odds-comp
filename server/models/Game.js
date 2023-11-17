const mongoose = require('mongoose');

// Creating a schema for NFL game betting.
const GameSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true,
        unique: true,
    },
    overUnder: {
        type: Number,
        required: true,
    },
    spread: {
        type: Number,
        required: true,
    },
    // If we want to add more fields we can add to this schema.
});

// creating a game model we can use to interact with our MongoDB collection.
const Game = mongoose.model('Game', GameSchema);

// Exporting our game model for use in other areas of our code.
module.exports = Game;