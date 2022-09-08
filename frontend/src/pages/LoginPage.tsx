import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { URL_USER_LOGIN_SVC } from '../configs';
import {
  STATUS_CODE_FORBIDDEN,
  STATUS_CODE_INVALID,
  STATUS_CODE_SUCCESS,
} from '../constants';
import { useAuthContext } from '../contexts/AuthContext';

function LoginPage() {
  // const [cookies, setCookie] = useCookies(["userCred"]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const {
    dispatch, setCookie,
  } = useAuthContext();

  const handleLogin = async () => {
    setIsLoginSuccess(false);
    console.log({ username, password });
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
      setIsLoginSuccess(true);
      saveCred(res.data.accessToken);
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

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
          <Typography className="font-normal leading-normal" variant="h3">
            Login
          </Typography>
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

        <Box className="flex flex-row-reverse">
          <Button variant="outlined" onClick={handleLogin}>
            Log in
          </Button>
          <Dialog open={isDialogOpen} onClose={closeDialog}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>{dialogMsg}</DialogContentText>
            </DialogContent>
            <DialogActions>
              {isLoginSuccess ? (
                <Button component={Link} to="/match">
                  Match
                </Button>
              ) : (
                <Button onClick={closeDialog}>Done</Button>
              )}
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </div>
  );
}

export default LoginPage;
