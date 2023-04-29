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
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import MoreButton from './recipeCardButtons/MoreButton.jsx';
import { updateCard } from '../slices/cardSlice';
import {
  addYumdRecipe,
  addEwwdRecipe,
  deleteEwwdRecipe,
  deleteYumdRecipe,
} from '../slices/userSlice';
import { Route } from "react-router-dom";

function RecipeCard({ recipe, children, type, addHandler }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  // Stuff to switch whether recipe is yum or eww
  const [vote, setVote] = React.useState(null);

  React.useEffect(() => {
    if (user.yumdRecipes && Object.hasOwn(user.yumdRecipes, recipe._id))
      setVote('yum');
    else if (user.ewwdRecipes && Object.hasOwn(user.ewwdRecipes, recipe._id))
      setVote('eww');
    else setVote(null);
  });

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
    if (user.loggedIn) {
      if (vote) deleteVote(vote);
      if (voteType) voteRecipe(voteType);
      setVote(voteType);
    }
  };

  // Working on adding 404 link
  // <Button sx={{ width: '50px' }}>
          //   <ShareOutlinedIcon 
          //     onClick={
          //       <Route 
          //         exact path='../public/notFound.html'
          //         render={() => {window.location.href="notFound.html"}}
          //       />
          //     }
          //     sx={{ color: 'black' }}
          //   />
          // </Button>

  return (
    <Card
      sx={{
        minWidth: 258,
        maxWidth: 258,
        minHeight: 420,
        border: 'none',
        background: '#DDBEA9',
        margin: '5px',
      }}
    >
      <CardMedia
        component="img"
        alt="recipe image"
        sx={{ width: '258px', height: '256px', alignItems: 'flex-end' }}
        // height="140"
        image={recipe.imagePath}
      />
      
      <CardActions>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Rate Recipe">
            <ToggleButtonGroup
              value={vote}
              exclusive
              disabled={!user.loggedIn}
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
          <Button 
            variant="contained"
            size="small"
            sx={{ minWidth: '25px' }}
          >
            <a href="/error"> <ShareOutlinedIcon sx={{ color: 'black' }}/> </a>
          </Button>
        </Stack>
      </CardActions>
        <div className='card-title'>
          <h2 className="recipe-title">{recipe.title}</h2>
        </div>
      {/* {children} */}
    </Card>
  );
}

export default RecipeCard;
