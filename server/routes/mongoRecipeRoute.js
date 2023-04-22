const router = require('express').Router();
const recipeController = require('../controller/recipeController');
const dalleImageController = require('../controller/dalleImageController');
const scrapingController = require('../controller/scrapingController');

// Scrape info for a specific URL provided
router.get('/scrapeurl', scrapingController, (req, res, next) => {
  res.status(200).json(res.locals);
});

// get all recipes from database
router.get('/all', recipeController.getAllRecipes, (req, res) => {
  res.status(200).json(res.locals.allRecipes);
});

// add new recipe to database & user's recipe list
router.post(
  '/add',
  dalleImageController.generateImage,
  recipeController.addNewRecipe,
  (req, res) => {
    console.log('end of add recipe route');
    res.status(200).json(res.locals.newRecipe);
  }
);

// update exisiting recipe, only through user
router.put('/update/:recipeId', recipeController.updateRecipe, (req, res) => {
  console.log('end of update recipe route');
  res.status(200).json(res.locals.updateRecipe);
});

// delete recipe from database & user's recipe list
router.delete(
  '/delete/:recipeId',
  recipeController.deleteRecipe,
  (req, res) => {
    console.log('end of delete recipe route');
    res.status(200).json('The recipe has been successfully deleted.');
  }
);

// increment yumdVote count for recipe
router.post(
  '/updateRecipe/:recipeId',
  recipeController.upVoteRecipe,
  (req, res) => {
    console.log('end of up vote recipe route');
    res.status(200).json(res.locals.upVoteRecipe);
  }
);

// increment ewwdVote count for recipe
router.post(
  '/updateRecipe/:recipeId',
  recipeController.downVoteRecipe,
  (req, res) => {
    console.log('end of down vote recipe route');
    res.status(200).json(res.locals.downVoteRecipe);
  }
);

module.exports = router;
