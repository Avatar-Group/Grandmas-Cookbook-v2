import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import { deleteCard,updateCard } from '../../slices/cardSlice';
import {deleteUserRecipe} from '../../slices/userSlice';

export default function MoreButton({ recipe }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const [saveEditButton, setSaveEditButton] = React.useState('Edit');
  const [canEdit, setCanEdit] = React.useState(false);

  function setSaveEditButtonLogic() {
    if (saveEditButton === 'Edit') {
      setSaveEditButton('Save');
    } else {
      setSaveEditButton('Edit');
    }
  }

  const canEditLogic = () => {
    if (canEdit) {
      setSaveEditButton('Edit');
      fetch(`/recipe/update/${recipe._id}`, {
        method: 'PUT',
        // edit the ingredients & directions list and also formatting by separating into new lines
        body: JSON.stringify({
          ...recipe,
          ingredientList: document
            .getElementById(`${recipe._id}ingredientText`)
            .textContent.split('\n'),
          directions: document
            .getElementById(`${recipe._id}directions`)
            .textContent.split('\n'),
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error(res.status);
        })
        .then((data) => {
          // setting updated recipe information to the cardSlice file
          dispatch(updateCard(data));
        })
        .catch((err) => console.log(`Error code: ${err}`));
    } else setSaveEditButton('Save');
    setCanEdit((state) => !state);
  };

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


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Tooltip title="More Info">
        <Button
          variant="contained"
          size="small"
          onClick={handleClickOpen('paper')}
          sx={{ minWidth: '25px' }}
        >
          <ReadMoreIcon sx={{ color: 'black' }} />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{recipe.title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id={`${recipe._id}ingredientText`}
            ref={descriptionElementRef}
            tabIndex={-1}
            contentEditable={canEdit.toString()}
            suppressContentEditableWarning
            // multiline
            style={{ whiteSpace: 'pre-line' }}
          >
            {recipe.ingredientList ? recipe.ingredientList.join('\n') : null}
          </DialogContentText>
        </DialogContent>

        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id={`${recipe._id}directions`}
            ref={descriptionElementRef}
            tabIndex={-1}
            contentEditable={canEdit.toString()}
            suppressContentEditableWarning
            // multiline
            style={{ whiteSpace: 'pre-line' }}
          >
            {recipe.directions ? recipe.directions.join('\n') : null}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          {user.postedRecipes &&
            Object.hasOwn(user.postedRecipes, recipe._id) && (
              <Tooltip title="Delete Recipe">
                <Button
                  size="small"
                  onClick={setDeleteButtonLogic}
                  sx={{ color: 'red' }}
                >
                  Delete {/* <DeleteForeverIcon sx={{ color: 'red' }} /> */}
                </Button>
              </Tooltip>
            )}
          {user.postedRecipes &&
            Object.hasOwn(user.postedRecipes, recipe._id) && (
              <Button color="success" onClick={canEditLogic}>
                {saveEditButton}
              </Button>
            )}
          <Button color="warning" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
