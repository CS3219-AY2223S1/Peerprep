import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link as ButtonLink,
  TextField,
  Typography,
} from '@mui/material';
import { URL_USER_LOGIN_SVC, URL_USER_SIGNUP_SVC } from '../configs';
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
  STATUS_CODE_FORBIDDEN,
  STATUS_CODE_INVALID,
  STATUS_CODE_SUCCESS,
  STATUS_CODE_UNAUTHORISED,
} from '../constants';
import { useAuthContext } from '../contexts/AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(true);
  const navigate = useNavigate();
  const { dispatch, setCookie } = useAuthContext();

  const handleLogin = async () => {
    const res = await axios
      .post(URL_USER_LOGIN_SVC, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_FORBIDDEN) {
          setErrorDialog('Invalid Username and/or Password!');
        } else if (err.response.status === STATUS_CODE_INVALID) {
          setErrorDialog('Password and Username cannot be empty!');
        } else {
          setErrorDialog('Internal Server Error');
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      setSuccessDialog('Account successfully logged in');
      saveCred(res.data.accessToken);
      navigate('/match');
    }
  };

  const handleSignup = async () => {
    setIsSignupSuccess(false);
    const res = await axios
      .post(URL_USER_SIGNUP_SVC, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_CONFLICT) {
          setErrorDialog('This username already exists');
        } else if (err.response.status === STATUS_CODE_UNAUTHORISED) {
          setErrorDialog('Password should be at least 8 characters long');
        } else if (err.response.status === STATUS_CODE_INVALID) {
          setErrorDialog('Password and Username cannot be empty!');
        } else {
          setErrorDialog('Internal server error');
        }
      });
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog('Account successfully created');
      setIsSignupSuccess(true);
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

  const toggleSignupStatus = () => setIsExistingUser(!isExistingUser);

  const toggleLogin = () => {
    toggleSignupStatus();
    closeDialog();
  };

  const setSuccessDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle('Success');
    setDialogMsg(msg);
  };

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle('Error');
    setDialogMsg(msg);
  };

  function saveCred(token) {
    dispatch({ type: 'LOGIN', payload: { user: username } });
    setCookie('userCred', token, { path: '/' });
  }

  return (
    <div>
      <div className="flex flex-col space-y-8 w-1/3 m-auto">
        <div className="flex justify-center">
          {isExistingUser ? (
            <Typography className="font-normal leading-normal" variant="h3" marginTop="4rem">
              Login
            </Typography>
          ) : (
            <Typography className="font-normal leading-normal" variant="h3" marginTop="4rem">
              Sign up
            </Typography>
          )}
        </div>
        <TextField
          label="Username"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: '1rem' }}
          autoFocus
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '2rem' }}
        />

        {isExistingUser ? (
          <Box className="flex justify-between">
            <ButtonLink
              component="button"
              variant="body2"
              onClick={toggleSignupStatus}
            >
              Sign up
            </ButtonLink>
            <Button variant="outlined" onClick={handleLogin}>
              Log in
            </Button>
          </Box>
        ) : (
          <Box className="flex justify-between">
            <ButtonLink
              component="button"
              variant="body2"
              onClick={toggleSignupStatus}
            >
              Login
            </ButtonLink>
            <Button variant="outlined" onClick={handleSignup}>
              Sign up
            </Button>
          </Box>
        )}

        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {isSignupSuccess ? (
              <Button component="button" onClick={toggleLogin}>
                Login
              </Button>
            ) : (
              <Button onClick={closeDialog}>Done</Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default LoginPage;
