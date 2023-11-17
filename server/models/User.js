const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userProfileSchema = new Schema( {
    username: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
       type: String,
       required: true,
       unique: true,
       match: [/.+@.+\..+/, 'Must be a valid email address.'] 
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
});