// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-import-module-exports
const Recipe = require('./recipeModel') ;
// https://mongoosejs.com/docs/schematypes.html#maps

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add an email'],
  },
  password: {
    type: String,
  },

  postedRecipes: {
    type: Map,
    of: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  yumdRecipes: {
    type: Map,
    of: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  ewwdRecipes: {
    type: Map,
    of: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  // userYumdVotes: {
  //   type: Number,
  //   default: 0,
  // },
  // userEwwdVotes: {
  //   type: Number,
  //   default: 0,
  // },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
