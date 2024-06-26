const path = require('path');
const request = require('supertest');
const helpers = require('../helpers');

const server = 'http://localhost:3000';

// persist recipe id that was created
var testId;

// parent test describe block
describe('Route integration', () => {
  // start with the /recipe route
  describe('/recipe', () => { 

    describe('GET to /getAllRecipes', () => {
      it('responds with 200 status and return res.locals.allRecipes to the front end', () => {
        return request(server)
          .get('/recipe/all')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
      });

      it('recipes fetched from DB are in the body of the response and contain the correct properties', () => {
        return request(server)
          .get('/recipe/all')
          .then(data => {
            expect(Array.isArray(data.body)).toEqual(true);
            if (data.body.length) {
              for (let i = 0; i < data.body.length; i++) {
                // console.log(data.body);
                const example = data.body[i];
                expect(typeof example).toEqual('object');
                expect(
                  Object.hasOwn(example, 'title') && 
                  Object.hasOwn(example, 'directions') && 
                  Object.hasOwn(example, 'url') &&
                  Object.hasOwn(example, 'ingredientList') && 
                  Object.hasOwn(example, 'yumdVote')  && 
                  Object.hasOwn(example, 'ewwdVote')  && 
                  Object.hasOwn(example, 'imagePath') 
                  // && Object.hasOwn(example, 'tastyId')  // uncomment after DB entry is fixed               
                  ).toBe(true);
              }
            };
          });
      });
    });

    describe('POST to /add', () => {
      // declare an "it" statement with description of what test is suppose to do
      it('responds with status 200, json content-type, and a new recipe document to be created with the correct properties', () => {
        return request(server)
          .post('/recipe/add')
          .send(helpers.mockPostRecipe)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .then(resp => {
            const example = resp.body;
            testId = resp.body._id;  // needa use it for PUT and DELETE
            console.log('id seen in POST block: ', testId);  
            expect(typeof example).toEqual('object');
            expect(
              Object.hasOwn(example, 'title') && 
              Object.hasOwn(example, 'directions') && 
              Object.hasOwn(example, 'url') &&
              Object.hasOwn(example, 'ingredientList') && 
              Object.hasOwn(example, 'yumdVote')  && 
              Object.hasOwn(example, 'ewwdVote')  && 
              Object.hasOwn(example, 'imagePath') 
              && Object.hasOwn(example, 'tastyId')  
              ).toBe(true);
          });
          console.log('after POST block: ', testId); 
      });

    });

    xdescribe(`PUT to /update/${testId}`, () => {  
      console.log('id seen in PUT block: ', testId);  
    });

  })
})

// describe('/', () => {
//   describe('GET', () => {
//     // Note that we return the evaluation of `request` here! It evaluates to
//     // a promise, so Jest knows not to say this test passes until that
//     // promise resolves. See https://jestjs.io/docs/en/asynchronous
//     it('responds with 200 status and text/html content type', () => {
//       return request(server)
//         .get('/')
//         .expect('Content-Type', /text\/html/)
//         .expect(200);
//     });
//   });
// });