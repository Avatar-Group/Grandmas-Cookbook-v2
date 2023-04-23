// router to handle pinterest requests 
const router = require('express').Router();
const pinController = require('../controller/pinterestAPI/pinController');

// testing out Pinterest SANDBOX feature while waiting for app connection approval 
// SANDBOX KEY EXPIRES MAY 22, 2023

// FROM PINTEREST API DOCS: 
/*
If the user is logged into Pinterest when clicking on the OAuth link, 
they will see a page where they can approve access for your app for the scopes you’re requesting. 
If the user is not logged in, they will be asked to log in.
*/

router.get('/oauth', pinController.getAccessCode,  /* pinController.exchange4Token, */ (req, res, next) => {

    console.warn(`NOTE: THE PINTEREST OAUTH FLOW IS CURRENTLY UNAVAILABLE BECAUSE WE HAVE NOT BEEN APPROVED.
    THUS, WE CANNOT REGISTER A REDIRECT URI TO OUR APP.`);

    res.status(200).json(res.locals.respBody);  // change status code accordingly
});

router.get('/boards', pinController.getAllBoards, (req, res, next) => {

    console.log(res.locals.boards);

    res.status(200).json(res.locals.boards); // change status code accordingly
});

module.exports = router;