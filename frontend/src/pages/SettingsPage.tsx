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
import NavBar from '../components/common/NavBar';
import TabPanel from '../components/common/TabPanel';

export default () => {
  const [value, setValue] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const closeDialog = () => setIsDialogOpen(false);

  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });
  return (
    <div>
      <NavBar />
      <div className="flex justify-center content-center flex-col grow h-max space-y-8 w-1/3 m-auto">
        <Box height="30" />
      </div>
      <div className="flex justify-center content-center flex-col grow h-max space-y-8 w-1/3 m-auto">
        <Card variant="outlined">
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Profile Settings" {...a11yProps(0)} />
                <Tab label="Account Settings" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                Profile stuff
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Button
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                >
                  Delete Account
                </Button>
              </TabPanel>
            </Box>
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
            <Button component="button">Delete</Button>
            <Button onClick={closeDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
