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
  const { loggedIn } = userState;
  
  // when the button is clicked, it needs to make a get request to /auth/google
  // to trigger oauth, and then dispatch initUser and userLoggedIn(true)

  // when logout is clicked, it should make a delete request to /users/logout
  // and dispatch initUser(null) and userLoggedIn(false)

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
        dispatch(userLoggedIn(true));
      })
      .catch((err) => console.log(`Error code: ${err}`));
  }, []);



  const handleLogout = () => {
    fetch('/users/logoutUser', { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then((data) => {
        if (data.message) {
          dispatch(initUser(null));
          dispatch(userLoggedIn(false));
        }
      })
      .catch((err) => console.log(`Error code: ${err}`))
  }

  const logoutButton = (
    <Button 
    color="ternary" 
    variant="contained"
    onClick={handleLogout}
  >
    Logout
  </Button> 
  );

  const loginButton = (
    <Button 
    color="ternary" 
    variant="contained"
  >
    <a href='/auth/google'>Login with google</a>
  </Button>
  )

    return (<div>
      <AppBar>
        <Toolbar>
          { loggedIn ? 
            logoutButton : 
            loginButton
          }
        </Toolbar>
      </AppBar>
    </div>)
}

export default NavBar;