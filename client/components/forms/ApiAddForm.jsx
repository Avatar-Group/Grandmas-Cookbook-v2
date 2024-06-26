import React, { useRef } from 'react';
import { TextField, Button, Box, Typography, Backdrop, CircularProgress, Alert} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setKeywordResult, toggleModalOn, toggleModalOff } from '../../slices/modalSlice.js';
import { addCard } from '../../slices/cardSlice'
import RecipeCard from '../recipeCard.jsx';

function APIAddForm({ setOpenAddRecipe }) {
    const keywordFieldValue = useRef('');
    const tagFieldValue = useRef('');
    const dispatch = useDispatch();
    const { keywordResults, clearKeywordResult } = useSelector(state=>state.modal)
    const [open, setOpen] = React.useState(false);
    const [queryError, setQueryError] = React.useState(false)
    const [success, setSuccess] = React.useState(false);
    const cardArr = []
    
    // handles toggling of "more details tab" for each recipe card
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    
    const addHandler = (recipe) => {
        handleOpen();
        setQueryError(true);
        return () => {
        // update database with new added recipe
        fetch('/recipe/add', 
            {method: 'POST', 
            body: JSON.stringify(recipe),
            headers: {
                'Content-type': 'application/json',
            }})
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error(res.status);
              })
            // updates state in the cardSlice reducer by adding current data(recipe) as the payload
            .then(data => {
                console.log(`this is data from our fetch request: ${data}`)
                dispatch(addCard(data))
            }
                )
            .then(() => handleClose())
            .catch(() => {
                setQueryError(true);
                handleClose()
            })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        handleOpen();
        setQueryError(false)
        
        const keywords = keywordFieldValue.current.value.split(' ');
        const tags = tagFieldValue.current.value.split(' ');
        
        let tagsQuery;
        let keywordsQuery;

        if (keywords[0] === '') {
            keywordsQuery = 'null'
            keywords.shift()
        } else {
            keywordsQuery = keywords.shift();
        }
        
        if (tags[0] === '') {
            tagsQuery = 'null'
            tags.shift()
        } else {
            tagsQuery = tags.shift();
        }
        
        while (keywords.length >= 1) {
            keywordsQuery += `%20${  keywords.shift()}`
        }
        
        while (tags.length >= 1) {
            tagsQuery += `%20${  tags.shift()}`
        }

        const query = 'http://localhost:3000/tasty/tagQuery/0/50/' + tagsQuery.toLowerCase() + '/' + keywordsQuery.toLowerCase()

        await fetch(query)
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error(res.status);
            })
            .then((data) => {
                // This loop allows only rendering of 5 recipes for results
                for (let i = 0; i < 5; i++) {
                    const { title } = data[i];
                    cardArr.push(<RecipeCard key={title} type='addForm' recipe={data[i]} addHandler={addHandler} />)
                }
                dispatch(setKeywordResult(cardArr))
                setOpenAddRecipe(false);
            })
            .then(() => handleClose())
            .catch((err) => {
                setQueryError(true)
                handleClose()
            })
            // .then(() => dispatch(clearKeywordResult()))
    };

    return (
        <Box
            sx={{
                '& > :not(style)': { m: 1, width: '70ch' },
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
             {queryError ? <Alert severity="error" style={{border: 'black 5px', background: '#DDBEA9'}}>Could not complete the search</Alert> : null}
            <TextField 
                sx={{
                    width: {sm: 300, md: 600},
                    md: 2,
                    boxShadow: 7
                }}
                id="tagsField" 
                label='tags' 
                inputRef={tagFieldValue}
            />
            <TextField 
                sx={{
                    width: {sm: 300, md: 600},
                    md: 2,
                    boxShadow: 4
                }}
                id="keywordField" 
                label='keywords' 
                inputRef={keywordFieldValue}
            />
            <Button 
                sx={{
                    boxShadow: 4,
                    borderRadius: 5
                }}
                onClick={handleSubmit}
            >Submit</Button>
            {keywordResults}
           
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}

export default APIAddForm;