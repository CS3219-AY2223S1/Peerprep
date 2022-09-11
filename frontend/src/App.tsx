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

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Box display="flex" flexDirection="column">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/match"
              element={!user ? <Navigate replace to="/login" /> : <MatchPage />}
            />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
