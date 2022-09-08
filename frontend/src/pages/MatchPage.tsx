import React, { useEffect, useMemo, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import { useAuthContext } from '../contexts/AuthContext';

export default () => {
  const socket = useMemo<Socket>(() => io('http://localhost:8001'), []);
  const { user } = useAuthContext();

  useEffect(() => {
    socket.on('matched', (data) => {
      console.log(data);
    });
  }, [socket]);

  const [timer, setTimer] = useState<number>(0);
  const TIMEOUT = 10;
  const REDIRECT_TIME = 3;
  enum Difficulty {
    Easy = 'EASY',
    Medium = 'MEDIUM',
    Hard = 'HARD',
  }

  const startTimer = () => {
    setTimer(TIMEOUT + REDIRECT_TIME);
  };

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  const handleSelection = (difficulty: Difficulty) => {
    startTimer();
    switch (difficulty) {
      case Difficulty.Easy:
        socket.emit('join_queue', { difficulty, user });
        break;
      case Difficulty.Medium:
        // TODO
        break;
      default:
        // TODO
        break;
    }
  };

  return (
    <div className="h-1/3 w-1/3 absolute inset-0 m-auto">
      {timer ? (
        <div className="flex flex-col justify-center items-center">
          <div className="mb-5 font-semibold font-sans text-3xl">{timer > REDIRECT_TIME ? 'Finding a match...' : 'Unable to find :( Please try again.'}</div>
          {timer > REDIRECT_TIME
            ? <div className="text-9xl animate-ping delay-1000">{timer - REDIRECT_TIME}</div> : <CircularProgress />}
        </div>
      ) : (
        <div className="flex flex-col space-y-8">
          <p>{user}</p>
          <Button size="large" variant="contained" color="success" onClick={() => handleSelection(Difficulty.Easy)}><b>Easy</b></Button>
          <Button size="large" variant="contained" color="warning" onClick={() => handleSelection(Difficulty.Medium)}><b>Medium</b></Button>
          <Button size="large" variant="contained" color="error" onClick={() => handleSelection(Difficulty.Hard)}><b>Hard</b></Button>
        </div>
      )}
    </div>
  );
};
