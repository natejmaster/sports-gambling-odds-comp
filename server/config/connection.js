const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sportsbetting', {
    userNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => {
    console.log('Connected to MongoDB');
})
.catch(error => {
    console.error('Could not connect to MongoDB:', error)
});

module.exports = mongoose.connection;
