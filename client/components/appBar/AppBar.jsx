import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, AppBar, Button, Container, Toolbar, Avatar } from '@mui/material';
import { initUser, userLoggedIn } from '../../slices/userSlice';


// eslint-disable-next-line react/function-component-definition
const NavBar = () => {
  // this component needs to subscribe to state from userSlice 'userLoggedIn'
  // and conditionally render a logout button if userLoggedIn is true
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const { loggedIn, userImgSrc } = userState;
  console.log(userImgSrc);
  console.log(userState);
  
  // when the button is clicked, it needs to make a get request to /auth/google
  // to trigger oauth, and then dispatch initUser and userLoggedIn(true)

  // when logout is clicked, it should make a delete request to /users/logout
  // and dispatch initUser(null) and userLoggedIn(false)

  useEffect(() => {
    fetch('/users/getUserByGoogleId', { method: 'GET' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.status);
      })
      .then((data) => {
        dispatch(initUser({ _id: data._id, userImgSrc: data.userImgSrc }));
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
          dispatch(initUser({ _id: null, userImgSrc: null }));
          dispatch(userLoggedIn(false));
        }
      })
      .catch((err) => console.log(`Error code: ${err}`))
  }

  const logoutButton = (
    <Button 
    color="secondary" 
    variant="contained"
    onClick={handleLogout}
  >
    Logout
  </Button> 
  );

  const loginButton = (
    <Button 
    color="secondary" 
    variant="contained"
  >
    <a href='/auth/google' style={{textDecoration: 'none', color: 'secondary'}}>Login with google</a>
  </Button>
  )

    return (<div>
      <AppBar>
        <Toolbar style={{display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
        { loggedIn ? 
            logoutButton : 
            loginButton
          }
          <Typography align="center" variant="h4" color="secondary">
            Grandma's Cookbook
          </Typography>
          <Avatar src={userImgSrc} />
        </Toolbar>

      </AppBar>
    </div>)
}

export default NavBar;