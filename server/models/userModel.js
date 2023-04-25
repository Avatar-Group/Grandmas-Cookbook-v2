// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-import-module-exports
const Recipe = require('./recipeModel');
// https://mongoosejs.com/docs/schematypes.html#maps

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true
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
    of: Recipe.schema,
  },
  yumdRecipes: {
    type: Map,
    of: Recipe.schema,
  },
  ewwdRecipes: {
    type: Map,
    of: Recipe.schema,
  },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
