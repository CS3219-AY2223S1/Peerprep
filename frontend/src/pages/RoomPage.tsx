import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/room/Footer';
import NavBar from '../components/common/NavBar';
import { useSocketContext } from '../contexts/SocketContext';
import { useAuthContext } from '../contexts/AuthContext';
import Editor from '../components/editor/Editor';
import Chat from '../components/room/Chat';
import { URL_GET_ROOM_UUID, URL_LEAVE_ROOM } from '../configs';
import { CollabSocketEvent } from '../constants';

export default () => {
  const { partner, dispatch, roomUuid } = useSocketContext();
  const { user, cookie } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [collaborationSocket, setCollaborationSocket] = useState<Socket>();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (collaborationSocket) {
      collaborationSocket.on(CollabSocketEvent.DISCONNECT_ALL, () => {
        dispatch({ type: 'DISCONNECTED' });
        navigate('/history');
      });
    }
  }, [collaborationSocket]);

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
          createdAt: Date.parse(res.data.createdAt),
        },
      });
      setCollaborationSocket(io(
        'http://localhost:9001',
        {
          path: '/collaborate',
          auth: { token: cookie.userCred },
          query: {
            partner: res.data.partnerName,
            roomUuid: res.data.uuid,
            difficulty: res.data.difficulty,
            createdAt: Date.parse(res.data.createdAt),
          },
        },
      ));
      if (roomUuid !== id) {
        navigate('/match');
      }
    } else {
      navigate('/match');
    }
  };

  const onLeave = () => {
    const accessToken = cookie.userCred;
    const res = axios({
      method: 'post',
      url: URL_LEAVE_ROOM,
      headers: {
        authorization: accessToken,
      },
    });
    res.then(() => {
      collaborationSocket.emit(CollabSocketEvent.DISCONNECT_ALL);
      dispatch({ type: 'DISCONNECTED' });
      navigate('/history');
      window.location.reload();
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="h-full flex">
        <div className="relative overflow-auto h-full w-full">
          {!!collaborationSocket && <Editor socket={collaborationSocket} />}
        </div>
        <div className="absolute z-1 bottom-20 right-2 w-1/5">
          <Chat />
        </div>
      </div>
      <Footer partnername={partner} username={user} onLeave={onLeave} />
    </div>
  );
};
