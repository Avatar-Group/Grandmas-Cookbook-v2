// testing out Pinterest SANDBOX feature while waiting for app connection approval 
// SANDBOX KEY EXPIRES MAY 22, 2023

// FROM PINTEREST API DOCS: 
/*
If the user is logged into Pinterest when clicking on the OAuth link, 
they will see a page where they can approve access for your app for the scopes you’re requesting. 
If the user is not logged in, they will be asked to log in.
*/

// require node-fetch
const fetch = require('node-fetch');

// pinterest oauth URL
const pinOAUTH = `https://www.pinterest.com/oauth/?`;

const pinController = {};

// set up first step of OAuth flow 
const redirect = `http://localhost:3000/auth/pinterest/success`;
const scope = `boards:read,boards:write,pins:read,pins:write,user_accounts:read`;  // powers we desire 
const state = 'true';  // supposed to be cryptographically secure to prevent cross-site forgery

pinController.getAccessCode = (req, res, next) => {
    // request access code from Pinterest for user 
    // REDIRECT URI MUST BE EXACTLY AS REGISTERED ON "MY CONNECTED APPS"
    // eslint-disable-next-line prefer-template
    const toURL = pinOAUTH + `client_id=${process.env.PINTEREST_APP_ID}&redirect_uri=${redirect}&response_type=code&scope=${scope}&state=${state}`; 
    console.log(toURL);
    fetch(toURL, {redirect: "follow"})
        .then((resp) => {
            if (resp.status > 399) {
                console.log(resp.json());
                throw new Error('Unauthorized by Pinterest');
            }
            else if (resp.redirected) {
                // pass URL to front-end to take user to log in on Pinterest ??? 
                res.redirect(resp.url);
                console.log('is resp redirected? ', resp.url);
            }
            else {
                res.locals.respBody = resp;
                console.log(resp);
            }
            next();
        })
        .catch((err) => {
            next({
                log: `Error encountered in getting Pinterest access code in pinController.getAccessCode ${err}`,
                message: 'Cannot retrieve a proper response from Pinterest',
              });
        });
} 

// exchange for token url 
const pinToken = `https://api.pinterest.com/v5/oauth/token`;
const secretKey = process.env.PINTEREST_SANDBOX;
pinController.exchange4Token = (req, res, next) => {
    // need to exchange access code for access TOKEN 
    // WE CAN'T EVEN SET THIS UP UNTIL WE'RE APPROVED 

    // DOCS: https://developers.pinterest.com/docs/getting-started/authentication/#1.%20Start%20the%20OAuth%20flow

}

// sandbox URL (test out Pinterest API before official approval)
const pintrstSdbx = `https://api-sandbox.pinterest.com/v5/`;
pinController.getAllBoards = (req, res, next) => {
    // get all boards 
    // console.log('secret Key: ', secretKey);
    const fetchOpts = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${secretKey}`,
            "Content-Type": "application/json",
        },
    };
    // console.log('fetch header: ', fetchOpts.headers);
    fetch(pintrstSdbx.concat('boards'), fetchOpts)
        .then((resp) => {
            if (resp.status > 399) {
                console.log(resp);
                throw new Error('Unauthorized by Pinterest');
            } 
            else if (resp.redirected) console.log('we have been redirected to: ', resp.url);
            else res.locals.boards = resp;
            next();
        })
            .catch((err) => {
                next({
                    log: `Error encountered in getting Pinterest boards in pinController.pintrstSdbx ${err}`,
                    message: `Cannot retrieve user's boards from Pinterest`,
                  });
            });
}

module.exports = pinController; 

