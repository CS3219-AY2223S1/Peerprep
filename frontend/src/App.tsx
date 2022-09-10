import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { Box } from '@mui/material';
import SignupPage from './components/SignupPage';
import MatchPage from './pages/MatchPage';
import { useAuthContext } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
// import NavBar from './components/common/NavBar';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      {/* <NavBar /> */}
      <Box display="flex" flexDirection="column">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/signup" />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/match" element={!user ? <Navigate replace to="/login" /> : <MatchPage />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
