import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/room/Footer';
import NavBar from '../components/common/NavBar';
import { useSocketContext } from '../contexts/SocketContext';
import { useAuthContext } from '../contexts/AuthContext';
import Editor from '../components/editor/Editor';
import Chat from '../components/room/Chat';

export default () => {
  const { partner, roomId } = useSocketContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState<string>();

  // route user back if user enter invalid room url
  useEffect(() => {
    /* eslint eqeqeq: 0 */
    if (roomId != id) {
      navigate('/match');
    }
  }, []);

  const onLeave = () => console.log('leave room button clicked');

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="h-full flex">
        <div className="relative overflow-auto h-full w-full">
          <Editor {...{ text, setText }} />
        </div>
        <div className="absolute z-1 bottom-14 right-2 w-1/5">
          <Chat roomId={id} />
        </div>

      </div>
      <Footer partnername={partner} username={user} onLeave={onLeave} />
    </div>
  );
};
