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
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { URL_USER_SIGNUP_SVC } from '../configs';
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from '../constants';

export function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const handleSignup = async () => {
    setIsSignupSuccess(false);
    const res = await axios
      .post(URL_USER_SIGNUP_SVC, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_CONFLICT) {
          setErrorDialog('This username already exists');
        } else {
          setErrorDialog('Please try again later');
        }
      });
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog('Account successfully created');
      setIsSignupSuccess(true);
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

  return (
    <div>
      <div className="flex flex-col space-y-8 w-1/3 m-auto">
        <div className="flex justify-center">
          <Typography className="font-normal leading-normal" variant="h3">
            Signup
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
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Button variant="outlined" onClick={handleSignup}>
            Sign up
          </Button>
        </Box>

        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {isSignupSuccess ? (
              <Button component={Link} to="/login">
                Log in
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
