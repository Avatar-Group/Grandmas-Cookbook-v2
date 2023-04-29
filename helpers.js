// helpers object contains the mock data used in backend testing
// test DELETE reqs last so that it undoes tested changes from our db

const helpers = {};

helpers.mockPostRecipe = {
    url: "test",
    title: "test",
    description: "test",
    directions: ["test"],
    ingredientList: ["test"],
    tastyId: null,
    imagePath: "test",
};

module.exports = helpers; 