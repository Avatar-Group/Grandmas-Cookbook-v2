// eslint-disable-next-line import/no-import-module-exports
import Recipe from './recipeModel';
// https://mongoosejs.com/docs/schematypes.html#maps

// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add an email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  
  postedRecipes:  { 
    type: Map,
      of: Recipe, 
    } ,
  yumdRecipes: {
    type: Map,
    of: Recipe, 
  },
  ewwdRecipes: {
    type: Map,
    of: Recipe, 
  },
  userYumdVotes: {
    type: Number,
    default: 0
  },
  userEwwdVotes: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('user', userSchema);
module.exports = User;