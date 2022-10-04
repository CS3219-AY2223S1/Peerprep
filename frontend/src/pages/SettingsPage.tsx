import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import axios from 'axios';
import NavBar from '../components/common/NavBar';
import TabPanel from '../components/common/TabPanel';
import { useAuthContext } from '../contexts/AuthContext';
import { URL_USER_DELETE_SVC } from '../configs';
import {
  STATUS_CODE_FORBIDDEN,
  STATUS_CODE_INVALID,
  STATUS_CODE_MISSING,
  STATUS_CODE_SUCCESS,
} from '../constants';

export default () => {
  const { dispatch, cookie, removeCookie } = useAuthContext();
  const [value, setValue] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = async () => {
    const accessToken = cookie.userCred;
    const res = await axios
      .post(URL_USER_DELETE_SVC, { password, accessToken })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_FORBIDDEN) {
          alert('Invalid Username and/or Password!');
        } else if (err.response.status === STATUS_CODE_INVALID) {
          alert('Username and/or Password are missing!');
        } else if (err.response.status === STATUS_CODE_MISSING) {
          alert('No jwt sent!');
        } else {
          alert('Internal server error');
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      closeDialog();
      removeCookie('userCred', { path: '/' });
      dispatch({ type: 'LOGOUT' });
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });
  return (
    <div className="h-96">
      <NavBar />
      <div className="flex justify-center inset-x-0 flex-col grow h-full space-y-8 w-1/3 m-auto mt-5">
        <Card variant="outlined" className="h-full">
          <Box
            className="h-full w-full"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tabs value={value} onChange={handleChange}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Tab label="Profile Settings" {...a11yProps(0)} />
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Tab label="Account Settings" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              Profile stuff
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Button
                className="mb-5"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                Delete Account
              </Button>
            </TabPanel>
          </Box>
        </Card>

        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Warning, you are about to delete your account
            </DialogContentText>
            <DialogContentText>Please enter password here:</DialogContentText>
            <TextField
              label="Password"
              align-self="center"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginTop: '2rem', marginBottom: '2rem' }}
            />
          </DialogContent>
          <DialogActions>
            <Button component="button" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={closeDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
