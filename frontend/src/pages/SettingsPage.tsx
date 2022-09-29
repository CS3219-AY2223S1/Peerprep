import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import NavBar from '../components/common/NavBar';
import TabPanel from '../components/common/TabPanel';
import { useAuthContext } from '../contexts/AuthContext';
import { URL_USER_CHANGE_PW_SVC, URL_USER_DELETE_SVC } from '../configs';
import {
  STATUS_CODE_FORBIDDEN,
  STATUS_CODE_INVALID,
  STATUS_CODE_MISSING,
  STATUS_CODE_SUCCESS,
} from '../constants';

export default () => {
  const {
    dispatch, cookie, removeCookie, setCookie,
  } = useAuthContext();
  const [value, setValue] = useState(0);
  const [password, setPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [changePWAlertStatus, setChangePWAlertStatus] = useState(0);
  const [changePWAlertMessage, setChangePWAlertMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [deleteAlertStatus, setDeleteAlertStatus] = useState(0);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState('');

  const handleTimeout = (delay: number) => new Promise((res) => setTimeout(res, delay));

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = async () => {
    const accessToken = cookie.userCred;
    const res = await axios
      .post(URL_USER_DELETE_SVC, { password, accessToken })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_FORBIDDEN) {
          handleDeleteAlert(1, 'Invalid Password!');
        } else if (err.response.status === STATUS_CODE_INVALID) {
          handleDeleteAlert(1, 'Password is missing!');
        } else if (err.response.status === STATUS_CODE_MISSING) {
          handleDeleteAlert(1, 'No jwt sent!');
        } else {
          handleDeleteAlert(1, 'Internal server error');
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      handleDeleteAlert(2, 'Account successfully deleted! The system will now log you out.');
      await handleTimeout(3000);
      removeCookie('userCred', { path: '/' });
      dispatch({ type: 'LOGOUT' });
    }
  };

  const handleChangePassword = async () => {
    if (password === '' || newPassword1 === '' || newPassword2 === '') {
      handleChangePWAlert(true, 'Fields cannot be empty!');
      return;
    }
    if (newPassword1 !== newPassword2) {
      handleChangePWAlert(true, 'New passwords do not match!');
      return;
    }
    if (newPassword1 === password) {
      handleChangePWAlert(true, 'New password cannot be the same as old password!');
      return;
    }
    if (newPassword1.length < 8) {
      handleChangePWAlert(true, 'New password must be at least 8 characters long!');
      return;
    }
    const accessToken = cookie.userCred;
    const res = await axios
      .post(URL_USER_CHANGE_PW_SVC, { password, newPassword: newPassword1, accessToken })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_FORBIDDEN) {
          handleChangePWAlert(true, 'Invalid Password!');
        } else if (err.response.status === STATUS_CODE_INVALID) {
          handleChangePWAlert(true, 'Password is missing!');
        } else if (err.response.status === STATUS_CODE_MISSING) {
          handleChangePWAlert(true, 'No jwt sent!');
        } else {
          handleChangePWAlert(true, 'Internal server error');
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      handleChangePWAlert(false, 'Password Sucessfully Changed!');
      setCookie('userCred', res.data.accessToken, { path: '/' });
    }
  };

  const handleDeleteAlert = (statusCode, message) => {
    setDeleteAlertStatus(statusCode);
    setDeleteAlertMessage(message);
  };

  const handleChangePWAlert = (hasError, message) => {
    setChangePWAlertStatus(hasError);
    setChangePWAlertMessage(message);
    setIsClicked(true);
  };

  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });
  return (
    <div className="h-96">
      <NavBar />
      <div className="flex justify-center inset-x-0 flex-col grow h-full space-y-8 w-1/3 m-auto mt-5">
        <Paper variant="outlined" className="h-full flex-grow-1 flex-col grow">
          <Box
            className="h-full w-full"
            flexGrow="1"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tabs value={value} onChange={handleChangeTab}>
              <Tab label="Profile Settings" {...a11yProps(0)} />
              <Tab label="Delete Account" {...a11yProps(1)} />
              <Tab label="Change Password" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              Profile stuff
            </TabPanel>
            <TabPanel value={value} index={1}>
              {deleteAlertStatus === 0 ? (
                <Alert severity="warning" sx={{ marginBottom: '1rem' }}>
                  Warning, you are about to delete your account
                </Alert>
              ) : deleteAlertStatus === 1 ? (
                <Alert severity="error" sx={{ marginBottom: '1rem' }}>{deleteAlertMessage}</Alert>
              ) : (
                <Alert severity="success" sx={{ marginBottom: '1rem' }}>
                  {deleteAlertMessage}
                </Alert>
              )}
              <Typography sx={{ marginBottom: '6rem' }}>To proceed with the account deletion, please enter password here:</Typography>
              <Box flexDirection="row">
                <TextField
                  label="Password"
                  align-self="center"
                  variant="standard"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ marginTop: '1rem', marginBottom: '2rem' }}
                />
                <Button
                  onClick={handleDelete}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  sx={{ marginLeft: '2rem', marginTop: '2rem', marginBottom: '3rem' }}
                >
                  Delete
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Box>
                { isClicked ? changePWAlertStatus ? (<Alert severity="error" sx={{ marginBottom: '1rem' }}>{changePWAlertMessage}</Alert>) : (<Alert severity="success" sx={{ marginBottom: '1rem' }}>{changePWAlertMessage}</Alert>) : null}
                <TextField
                  label="Old Password"
                  align-self="center"
                  variant="standard"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                />
                <br />
                <TextField
                  label="New Password"
                  align-self="center"
                  variant="standard"
                  type="password"
                  value={newPassword1}
                  onChange={(e) => setNewPassword1(e.target.value)}
                  sx={{ marginBottom: '1rem' }}
                />
                <br />
                <TextField
                  label="Retype New Password"
                  align-self="center"
                  variant="standard"
                  type="password"
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  sx={{ marginBottom: '2rem' }}
                />
                <Button sx={{ marginTop: '1rem', marginBottom: '2rem', marginLeft: '5rem' }} variant="outlined" onClick={handleChangePassword}>Change Password</Button>
              </Box>
            </TabPanel>
          </Box>
        </Paper>
      </div>
    </div>
  );
};
