const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sportsbetting');
// .then(async () => {
//     console.log('Connected to MongoDB');

//     // We can replace this with actual user data once we're further along.
//     // Just temporary placeholder details for when we
//     // get the data from the frontend forms via HTTP requests.
//     const userDetails = {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//     };

//     const newUser = new User(userDetails);

//     try {
//         const savedUser = await newUser.save();
//         console.log('New user saved:', savedUser);
//     } catch (error) {
//         console.error('Error saving user:', error);
//     }
    
// })
// .catch(error => {
//     console.error('Could not connect to MongoDB:', error)
// });

module.exports = mongoose.connection;
