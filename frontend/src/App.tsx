import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Box } from '@mui/material';
import MatchPage from './pages/MatchPage';
import { useAuthContext } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RoomPage from './pages/RoomPage';
import SettingsPage from './pages/SettingsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Box display="flex" flexDirection="column">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/room/:id" element={!user ? <Navigate replace to="/login" /> : <RoomPage />} />
            <Route
              path="/login"
              element={user ? <Navigate replace to="/match" /> : <LoginPage />}
            />
            <Route
              path="/match"
              element={!user ? <Navigate replace to="/login" /> : <MatchPage />}
            />
            <Route
              path="/settings"
              element={
                !user ? <Navigate replace to="/login" /> : <SettingsPage />
              }
            />
            <Route
              path="/history"
              element={
                !user ? <Navigate replace to="/login" /> : <HistoryPage />
              }
            />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
