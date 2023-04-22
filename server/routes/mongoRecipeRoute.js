const router = require('express').Router();
const recipeController = require('../controller/recipeController');

// get all recipes from database
router.get('/allRecipes', recipeController.getAllRecipes, (req, res) => {
  console.log('end of get all recipes route');
  res.status(200).json(res.locals.allRecipes);
});

// add new recipe to database & user's recipe list
router.post('/addRecipes', recipeController.addNewRecipe, (req, res) => {
  console.log('end of add recipe route');
  res.status(200).json(res.locals.newRecipe);
});

// update exisiting recipe, only through user
router.put('/updateRecipe/:userId/:recipeId', recipeController.updateRecipe, (req, res) => {
  console.log('end of update recipe route');
  res.status(200).json(res.locals);
});

// delete recipe from database & user's recipe list
router.delete('/deleteRecipe/:userId/:recipeId', recipeController.deleteRecipe, (req, res) => {
  console.log('end of delete recipe route');
  res.status(200).json('The recipe has been successfully deleted.');
});

// increment yumdVote count for recipe
router.post('/updateRecipe/:recipeId', recipeController.upVoteRecipe, (req, res) => {
  console.log('end of up vote recipe route');
  res.status(200).json(res.locals.upVoteRecipe);
});

// increment ewwdVote count for recipe
router.post('/updateRecipe/:recipeId', recipeController.downVoteRecipe, (req, res) => {
  console.log('end of down vote recipe route');
  res.status(200).json(res.locals.downVoteRecipe);
})