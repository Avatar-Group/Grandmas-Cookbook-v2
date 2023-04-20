// eslint-disable-next-line import/no-import-module-exports
import Recipe from './recipeModel';


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
  // https://mongoosejs.com/docs/schematypes.html#maps
  postedRecipes:  { 
    type: Map,
      of: Recipe, 
    } ,
    yumdRecipe: {
      type: Map,
      of: Recipe, 
    },
    ewwdRecipe: {
      type: Map,
      of: Recipe, 
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;