import React from 'react';
import { Button } from '@mui/material';
function MatchPage() {
  return (<div>
    <div className="flex flex-col space-y-8 w-1/3 m-auto">
        <Button size="large" variant="contained" color="success">Easy</Button>
        <Button size="large" variant="contained" color="warning">Medium</Button>
        <Button size="large" variant="contained" color="error">Hard</Button>
    </div>
  </div>);
}

export default MatchPage;
