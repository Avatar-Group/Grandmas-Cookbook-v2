const router = require('express').Router();
const recipeController = require('../controller/recipeController');

// get all recipes from database
router.get('/allRecipes', recipeController.getAllRecipes, (req, res) => {
  console.log('end of get all recipes route');
  res.status(200).json(res.locals.allRecipes);
});

// add new recipe to database & user's recipe list
router.post('/addRecipes', recipeController.addRecipe, (req, res) => {
  console.log('end of add recipe route');
  res.status(200).json(res.locals.newRecipe);
});

// update exisiting recipe
router.put('/updateRecipe/:id', recipeController.updateRecipe, (req, res) => {
  console.log('end of update recipe route');
  res.status(200).json(res.locals);
});

// delete recipe from database & user's recipe list
router.delete('/deleteRecipe/:id', recipeController.deleteRecipe, (req, res) => {
  res.status(200).json('The recipe has been successfully deleted.');
});