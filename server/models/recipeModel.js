// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
  }]
});

const Recipe = mongoose.model('recipe', recipeSchema);
module.exports = Recipe;