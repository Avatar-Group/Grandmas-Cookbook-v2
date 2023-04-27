import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import MoreButton from './recipeCardButtons/MoreButton.jsx';
import { deleteCard, updateCard } from '../slices/cardSlice';
import {
  addYumdRecipe,
  addEwwdRecipe,
  deleteUserRecipe,
  deleteEwwdRecipe,
  deleteYumdRecipe,
} from '../slices/userSlice';

function RecipeCard({ recipe, children, type, addHandler }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const setDeleteButtonLogic = async () => {
    try {
      const recipeRes = await fetch(`/recipe/delete/${recipe._id}`, {
        method: 'DELETE',
      });
      const userRes = await fetch(`/user/postedRecipe/${recipe._id}`, {
        method: 'DELETE',
      });
      if (recipeRes.ok && userRes.ok) {
        dispatch(deleteCard(recipe));
        dispatch(deleteUserRecipe(recipe));
        return;
      }
      throw new Error(recipeRes.status + userRes.status);
    } catch (err) {
      console.log(`Error code: ${err}`);
    }
  };

  // Stuff to switch whether recipe is yum or eww
  const [vote, setVote] = React.useState(null);

  React.useEffect(() => {
    if (Object.hasOwn(user.yumdRecipes, recipe._id)) setVote('yum');
    else if (Object.hasOwn(user.ewwdRecipes, recipe._id)) setVote('eww');
  }, []);

  const voteRecipe = async (voteType) => {
    try {
      const recipeRes = await fetch(`/recipe/${voteType}Recipe/${recipe._id}`, {
        method: 'PATCH',
      });
      const userRes = await fetch(`/user/${voteType}Recipe/${recipe._id}`, {
        method: 'PUT',
      });
      if (recipeRes.ok && userRes.ok) {
        const updatedRecipe = await recipeRes.json();
        dispatch(updateCard(updatedRecipe));
        if (voteType === 'yum') dispatch(addYumdRecipe(updatedRecipe));
        else dispatch(addEwwdRecipe(updatedRecipe));
        return;
      }
      throw new Error(recipeRes.status + userRes.status);
    } catch (err) {
      console.log(`Error code: ${err}`);
    }
  };

  const deleteVote = async (voteType) => {
    try {
      const recipeRes = await fetch(
        `/recipe/${voteType}RecipeRemove/${recipe._id}`,
        {
          method: 'PATCH',
        }
      );
      const userRes = await fetch(`/user/${voteType}Recipe/${recipe._id}`, {
        method: 'DELETE',
      });
      if (recipeRes.ok && userRes.ok) {
        const updatedRecipe = await recipeRes.json();
        dispatch(updateCard(updatedRecipe));
        if (voteType === 'yum') dispatch(deleteYumdRecipe(updatedRecipe));
        else dispatch(deleteEwwdRecipe(updatedRecipe));
        return;
      }
      throw new Error(recipeRes.status + userRes.status);
    } catch (err) {
      console.log(`Error code: ${err}`);
    }
  };

  const handleVote = (event, voteType) => {
    if (vote) deleteVote(vote);
    if (voteType) voteRecipe(voteType);
    console.log(vote, voteType);
    setVote(voteType);
  };

  return (
    <Card
      sx={{
        minWidth: 400,
        border: 'none',
        background: '#DDBEA9',
      }}
    >
      <CardMedia
        component="img"
        alt="recipe image"
        sx={{ width: '258px', height: '256px', alignItems: 'flex-end' }}
        // height="140"
        image={recipe.imagePath}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {recipe.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Rate Recipe">
            <ToggleButtonGroup
              value={vote}
              exclusive
              onChange={handleVote}
              aria-label="recipe vote"
            >
              <ToggleButton value="yum" aria-label="yum" size="small">
                <InsertEmoticonIcon sx={{ marginRight: '.5rem' }} />
                <Typography>{recipe.yumdVote}</Typography>
              </ToggleButton>
              <ToggleButton value="eww" aria-label="eww" size="small">
                <SentimentVeryDissatisfiedIcon sx={{ marginRight: '.5rem' }} />
                <Typography>{recipe.ewwdVote}</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Tooltip>
          <MoreButton recipe={recipe} />
          {Object.hasOwn(user.postedRecipes, recipe._id) && (
            <Tooltip title="Delete Recipe">
              <Button
                variant="contained"
                size="small"
                onClick={setDeleteButtonLogic}
                sx={{ minWidth: '25px' }}
              >
                <DeleteForeverIcon sx={{ color: 'red' }} />
              </Button>
            </Tooltip>
          )}
        </Stack>
      </CardActions>
      {children}
    </Card>
  );
}

export default RecipeCard;
