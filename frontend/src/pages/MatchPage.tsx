import React, { useEffect, useMemo, useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../contexts/AuthContext';
import NavBar from '../components/common/NavBar';
import { Difficulty, Match, SocketEvent } from '../constants';
import { ConnectedElseWhereModal, AlreadyInQueueModal } from '../components';

export default () => {
  const [cookie] = useCookies(['userCred']);
  const socket = useMemo<Socket>(() => io('http://localhost:8001', { auth: { token: cookie.userCred } }), []);
  const { user } = useAuthContext();
  const [isConnectedElsewhere, setIsConnectedElsewhere] = useState<boolean>(false);
  const [isInQueue, setisInQueue] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    socket.on(SocketEvent.MATCHED, (data) => {
      console.log(data);
    });
    socket.on(SocketEvent.CONNECTED_ELSEWHERE, () => {
      setIsConnectedElsewhere(true);
    });
    socket.on(SocketEvent.ALREADY_IN_QUEUE, () => {
      setisInQueue(true);
      setTimer(0);
    });
    socket.on(SocketEvent.UNEXPECTED_QUEUE_ERROR, () => {
      // TODO: Ask them to requeue as we kicked them out of the Q.
    });
  }, [socket]);

  const startTimer = () => {
    setTimer(Match.TIMEOUT + Match.REDIRECT_TIME);
  };

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
  }, [timer]);

  const handleSelection = (difficulty: Difficulty) => {
    startTimer();
    socket.emit(SocketEvent.JOIN_QUEUE, { difficulty, user });
  };

  return (
    <div>
      <NavBar />
      <Box display="flex" flexDirection="column">
        <div className="h-1/3 w-1/3 absolute inset-0 m-auto">
          <ConnectedElseWhereModal visible={isConnectedElsewhere} />
          <AlreadyInQueueModal visible={isInQueue} setVisible={setisInQueue} />
          {timer ? (
            <div className="flex flex-col justify-center items-center">
              <div className="mb-5 font-semibold font-sans text-3xl">{timer > Match.REDIRECT_TIME ? 'Finding a match...' : 'Unable to find :( Please try again.'}</div>
              {timer > Match.REDIRECT_TIME
                ? <div className="text-9xl animate-ping delay-1000">{timer - Match.REDIRECT_TIME}</div> : <CircularProgress />}
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
      </Box>
    </div>
  );
};
