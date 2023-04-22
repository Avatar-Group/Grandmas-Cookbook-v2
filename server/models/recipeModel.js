// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
    required: false
  },
  recipeTitle : {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  directions: [{
    type: String,
    required: true
  }],
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    measurement: {
      type: String,
      required: true
    }
  }],
  yumdVote: {
    type: Number,
    default: 0
  },
  ewwdVote: {
    type: Number,
    default: 0
  },
  tastyId: {
    type: Number,
    default: undefined
  },
  imagePath: String
});

const Recipe = mongoose.model('recipe', recipeSchema);
module.exports = Recipe;