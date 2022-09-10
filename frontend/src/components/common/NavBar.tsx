import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useAuthContext } from '../../contexts/AuthContext';


const NavBar = () => {
  const { dispatch, removeCookie } = useAuthContext();
  const handleLogout = () => {
      removeCookie('userCred', { path: '/' });
      dispatch({type:'LOGOUT'});
  };
  return (
    <AppBar position='static'>
        <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                <PeopleAltIcon/>
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                PEERPREP
            </Typography>
            <Stack direction='row' spacing={2}>
                <Button color='inherit'>Find an Interview Partner</Button>
                <Button color='inherit'>Edit your profile</Button>
                <Button color='inherit' onClick={ handleLogout }>Logout</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar;