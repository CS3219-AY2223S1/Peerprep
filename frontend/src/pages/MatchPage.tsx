import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../contexts/AuthContext';
import NavBar from '../components/common/NavBar';
import {
  Difficulty,
  Match,
  SocketEvent,
  STATUS_CODE_CONFLICT,
  STATUS_CODE_INVALID,
  STATUS_CODE_UNAUTHORISED,
} from '../constants';
import { ConnectedElseWhereModal, AlreadyInQueueModal } from '../components';
import { useSocketContext } from '../contexts/SocketContext';
import { URL_GET_ROOM_UUID } from '../configs';

export default () => {
  const { user, cookie } = useAuthContext();
  const { socket, dispatch } = useSocketContext();
  const [isConnectedElsewhere, setIsConnectedElsewhere] = useState<boolean>(false);
  const [isInQueue, setisInQueue] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const { roomUuid } = useSocketContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Example
    fetchData();
    if (roomUuid) {
      navigate(`/room/${roomUuid}`);
    }
  }, []);

  const fetchData = async () => {
    const accessToken = cookie.userCred;
    const res = await axios
      .get(URL_GET_ROOM_UUID, { headers: { authorization: accessToken } })
      .catch((err) => {
        console.log(err);
      });
    if (res && res.data) {
      dispatch({
        type: 'MATCHED',
        payload: {
          partner: res.data.partnerName,
          roomUuid: res.data.uuid,
          difficulty: res.data.difficulty,
        },
      });
      navigate(`/room/${roomUuid}`);
    }
  };

  useEffect(() => {
    socket.on(SocketEvent.MATCHED, () => {
      fetchData();
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
