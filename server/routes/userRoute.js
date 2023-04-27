const router = require('express').Router();
const userController = require('../controller/userController');
const baseurl = require('../server');

console.log(baseurl);


// get all of user's recipe
router.get('/postedRecipes/:id', userController.getAllUsersRecipes, (req, res) => {
  console.log('end of get user\'s recipe');
  res.status(200).json(res.locals.postedRecipes);
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

// update user's yumdRecipe count and recipe
router.put('/userRecipe/:id', userController.updateUserYumdVotes, (req, res) => {
  console.log('end of get user\'s yumd recipe update');
  res.status(200).json(req.user);
});

// update user's ewwddRecipe count and recipe
router.put('/userRecipe/:id', userController.updateUserEwwdVotes, (req, res) => {
  console.log('end of get user\'s ewwd recipe update');
  res.status(200).json(req.user);
});

router.delete('/logoutUser', userController.logout, (req, res) => {
  console.log('end of user/logout route')
  res.status(200).json({ message: 'logged out' })
})

router.get('/getUserByGoogleId', userController.getUserByGoogleId, (req, res) => {
  console.log('end of /getUserByGoogleId route');
  res.status(200).json(res.locals.user)
})



module.exports = router;