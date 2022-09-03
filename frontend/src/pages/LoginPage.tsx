import React, { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { Box, Button, TextField, Typography } from "@mui/material";

function LoginPage() {
  const [cookies, setCookie] = useCookies(["userCred"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function saveCred() {
    setCookie("userCred", [username, password], { path: "/" });
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
          sx={{ marginBottom: "1rem" }}
          autoFocus
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: "2rem" }}
        />
        <Box className="flex flex-row-reverse">
          <Button variant="outlined" onClick={saveCred}>
            Log in
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default LoginPage;
