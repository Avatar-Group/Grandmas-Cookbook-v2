const router = require('express').Router();
const userController = require('../controller/userController');


// get all of user's recipe
router.get('/postedRecipes/:id', userController.getAllUsersRecipes, (req, res) => {
  console.log('end of get user\'s recipe');
  res.status(200).json(res.locals.allRecipes);
});

// get user's one recipe
router.get('/userRecipe/:id', userController.getUserOneRecipe, (req, res) => {
  console.log('end of get user\'s one recipe');
  res.status(200).json(res.locals.recipe);
});

// get all user's yum'd recipes
router.get('/userRecipe/:id', userController.getAllYumdRecipes, (req, res) => {
  console.log('end of get user\'s yummd recipes');
  res.status(200).json(res.locals.allYumdRecipes);
});

// get all user's eww'd recipes
router.get('/userRecipe/:id', userController.getAllEwwdRecipes, (req, res) => {
  console.log('end of get user\'s ewwd recipes');
  res.status(200).json(res.locals.allEwwdRecipes);
});


module.exports = router;