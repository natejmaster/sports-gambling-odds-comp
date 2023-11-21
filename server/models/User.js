const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Bet = require('./Bet');

const userProfileSchema = new Schema({
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
  activeBets: {
      type: [{
          type: Schema.Types.ObjectId,
          ref: 'Bet',
      }],
      default: [],
  },
  betHistory: {
      type: [{
          type: Schema.Types.ObjectId,
          ref: 'Bet',
      }],
      default: [],
  },
  units: {
      type: Number,
      default: 0,
  }
});


userProfileSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  userProfileSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  const User = model('User', userProfileSchema);

  module.exports = User;