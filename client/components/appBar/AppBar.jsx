import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Button, Toolbar, Avatar, Typography } from '@mui/material';
import { initUser, userLoggedIn, logoutUser } from '../../slices/userSlice';

// eslint-disable-next-line react/function-component-definition
const NavBar = () => {
  // this component needs to subscribe to state from userSlice 'userLoggedIn'
  // and conditionally render a logout button if userLoggedIn is true
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { loggedIn, userImgSrc } = userState;

  // when the button is clicked, it needs to make a get request to /auth/google
  // to trigger oauth, and then dispatch initUser and userLoggedIn(true)

  // when logout is clicked, it should make a delete request to /users/logout
  // and dispatch initUser(null) and userLoggedIn(false)

  useEffect(() => {
    // fetch the specific user
    // build a getUserByGoogleId middleware which uses req.user.id to search
    // for the user by googleId in the database
    fetch('/user/getUserByGoogleId', { method: 'GET' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then((data) => {
        dispatch(initUser(data));
        dispatch(userLoggedIn(true));
      })
      .catch((err) => console.log(`Error code: ${err}`));
  }, []);

  const handleLogout = () => {
    fetch('/user/logoutUser', { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then((data) => {
        if (data.message) {
          console.log(data);
          dispatch(logoutUser());
        }
      })
      .catch((err) => console.log(`Error code: ${err}`));
  };

  const logoutButton = (
    <Button color="secondary" variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );

  const loginButton = (
    <Button color="secondary" variant="contained">
      <a
        href="/auth/google"
        style={{ textDecoration: 'none', color: 'secondary' }}
      >
        Login with google
      </a>
    </Button>
  );

  return (
    <div>
      <AppBar>
        <Toolbar
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {loggedIn ? logoutButton : loginButton}
          {/* <Typography align="center" variant="h4" color="secondary">
            Avatar's Cookbook
          </Typography> */}
          <h1>Avatar's Cookbook</h1>
          <div>{loggedIn && <Avatar src={userImgSrc} />}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
