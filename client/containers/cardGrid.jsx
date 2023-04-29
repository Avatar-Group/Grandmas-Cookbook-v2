import React, { useEffect } from 'react';
import {
  Card,
  Button,
  Grid,
  Container,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from '../components/recipeCard.jsx';
import AddRecipeModal from '../components/addRecipePage/AddRecipeModal.jsx';
import { init } from '../slices/cardSlice';
import { clearKeywordResult } from '../slices/modalSlice';

function CardGrid() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { recipes } = useSelector((state) => state.card);

  // States to support live filtering of the recipes
  const [filteredRecipes, setFilteredRecipes] = React.useState([]);
  const [filterKeyword, setFilterKeyword] = React.useState('');

  // Stuff to switch what set of recipes is displaying
  const [recipeSet, setRecipeSet] = React.useState('all');

  const handleRecipeSet = (event, newRecipeSet) => {
    setRecipeSet(newRecipeSet);
  };

  // State to support the add recipe modal.
  const [openAddRecipe, setOpenAddRecipe] = React.useState(false);

  // Handler for control the filter keyword in text field.
  const onFilterKeywordChange = (e) => setFilterKeyword(e.target.value);

  // Two handlers for open and close the add recipe modal.
  const handleCloseAddRecipe = () => {
    setOpenAddRecipe(false);
    dispatch(clearKeywordResult());
  };
  const handleOpenAddRecipe = () => {
    setOpenAddRecipe(true);
  };

  useEffect(() => {
    fetch('/recipe/all', { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.status);
      })
      .then((data) => {
        // console.log(`inside of fetch request for get all recipes FRONT END`)
        dispatch(init(data));
      })
      .catch((err) => console.log(`Error code: ${err}`));
  }, []);

  useEffect(() => {
    let tempRecipes = recipes;
    if (user.postedRecipes || user.yumdRecipes || user.ewwdRecipes) {
      tempRecipes = tempRecipes.filter((recipe) => {
        switch (recipeSet) {
          case 'all':
            return true;
          case 'mine':
            return Object.hasOwn(user.postedRecipes, recipe._id);
          case 'yumd':
            return Object.hasOwn(user.yumdRecipes, recipe._id);
          case 'ewwd':
            return Object.hasOwn(user.ewwdRecipes, recipe._id);
          default:
            return true;
        }
      });
    }

    tempRecipes = tempRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(filterKeyword.toLowerCase())
    );
    setFilteredRecipes(tempRecipes);
  }, [recipes, filterKeyword, recipeSet]);

  return (
    <main>
      <div>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {user.loggedIn && (
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleOpenAddRecipe}
                  sx={{ marginTop: '16px' }}
                >
                  Add New Recipe
                </Button>
              </Grid>
            )}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <TextField
                label="Find Your Recipe"
                variant="standard"
                value={filterKeyword}
                onChange={onFilterKeywordChange}
                inputProps={{ style: { fontSize: 32 } }}
                fullWidth
              />
            </Grid>
            <Grid item xs={1} sx={{ textAlign: 'center' }}>
              <ToggleButtonGroup
                orientation="vertical"
                value={recipeSet}
                exclusive
                onChange={handleRecipeSet}
                aria-label="recipe set"
              >
                <ToggleButton value="all" aria-label="all">
                  All
                </ToggleButton>
                <ToggleButton
                  value="mine"
                  aria-label="mine"
                  disabled={
                    !Object.hasOwn(user, 'postedRecipes') ||
                    (Object.hasOwn(user, 'postedRecipes') &&
                      Object.keys(user.postedRecipes).length === 0)
                  }
                >
                  Mine
                </ToggleButton>
                <ToggleButton
                  value="yumd"
                  aria-label="yumd"
                  disabled={
                    !Object.hasOwn(user, 'yumdRecipes') ||
                    (Object.hasOwn(user, 'yumdRecipes') &&
                      Object.keys(user.yumdRecipes).length === 0)
                  }
                >
                  Yumd
                </ToggleButton>
                <ToggleButton
                  value="ewwd"
                  aria-label="eww"
                  disabled={
                    !Object.hasOwn(user, 'ewwdRecipes') ||
                    (Object.hasOwn(user, 'ewwdRecipes') &&
                      Object.keys(user.ewwdRecipes).length === 0)
                  }
                >
                  Ewwd
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={11}>
              <Container className="classes.cardGrid">
                <Grid container spacing={3}>
                  {filteredRecipes.map((card) => (
                    <Grid item key={card._id} xs={12} sm={4} md={3}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <RecipeCard
                          recipe={card}
                          title={card.title}
                          image={card.imagePath}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
              <AddRecipeModal
                open={openAddRecipe}
                handleClose={handleCloseAddRecipe}
                setOpenAddRecipe={setOpenAddRecipe}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </main>
  );
}

export default CardGrid;
