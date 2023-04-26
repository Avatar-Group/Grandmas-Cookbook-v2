import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, AppBar, Button, Container, Toolbar, MuiPaper } from '@mui/material';
import { initUser, userLoggedIn } from '../../slices/userSlice';


// eslint-disable-next-line react/function-component-definition
const NavBar = () => {
  // this component needs to subscribe to state from userSlice 'userLoggedIn'
  // and conditionally render a logout button if userLoggedIn is true
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const {loggedIn } = userState;

  // when the button is clicked, it needs to make a get request to /auth/google
  // to trigger oauth, and then dispatch initUser and userLoggedIn(true)

  // when logout is clicked, it should make a delete request to /users/logout

  useEffect(() => {
    // fetch the specific user
    // build a getUserByGoogleId middleware which uses req.user.id to search
    // for the user by googleId in the database
    fetch('/users/getUserByGoogleId', { method: 'GET' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.status);
      })
      .then((data) => {
        dispatch(initUser(data._id));
      })
      .catch((err) => console.log(`Error code: ${err}`));
  }, []);
  
    return (<div>
      <AppBar>
        <Toolbar>
          { loggedIn ? 
          <Button 
            color="ternary" 
            variant="contained"
          >
            Logout
          </Button> :
          <Button 
            color="ternary" 
            variant="contained"
            onClick={loginClickHandler}
          >
            <a href='/auth/google'>Login with google</a>
          </Button>
          // 
          }
        </Toolbar>
      </AppBar>
    </div>)
}

export default NavBar;