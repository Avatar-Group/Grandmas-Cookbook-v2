const path = require('path');
const request = require('supertest');
const assert = require('assert');

const server = 'http://localhost:3000';

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
              const example = data.body[0]
              expect(typeof example).toEqual('object');
              expect(
                // insert other required properties here
                Object.hasOwn(example, 'title') && 
                Object.hasOwn(example, 'directions') &&
                Object.hasOwn(example, 'ingredientList')
                ).toEqual(true);
            };
          });
      });
    });

    describe('POST to /add', () => {
      // create a describe block that specifies the starting path from the server all the way through the controller
      describe('/recipe/add', () => {
        // declare an "it" statement with description of what test is suppose to do
        it('successful post request will return a status of 200 as well as res.locals.newRecipe object to the front end', () => {
          return request(server)
            .post('/recipe/add')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect((res) => {
              assert(res.body.hasOwnProperty('status'));
              assert(res.body.hasOwnProperty('message'));
            });
        });

        it('post request will return an object with the required fields to create a new recipe in the database', () => {
          return request(server)
            .post('/recipe/add')
            .then(data => {
              expect(typeof data).toEqual('object')
              if (data.body.length) {
                const example = data.body[0]
                expect(typeof example).toEqual('string');
                expect(
                  Object.hasOwn(example, 'title') &&
                  Object.hasOwn(example, 'directions') &&
                  Object.hasOwn(example, 'ingredientList')
                ).toEqual(true)
              };
          });
        })
      })
    })
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