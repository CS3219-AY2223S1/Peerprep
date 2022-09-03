import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import SignupPage from "./components/SignupPage";
import SocketTest from "./pages/SocketTest";
import MatchPage from "./pages/MatchPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Box display="flex" flexDirection="column" padding="4rem">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/signup" />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/socket-test" element={<SocketTest />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
