import React from 'react';
import Footer from '../components/room/footer';
import NavBar from '../components/common/NavBar';
import { useSocketContext } from '../contexts/SocketContext';
import { useAuthContext } from '../contexts/AuthContext';

export default () => {
  const { partner } = useSocketContext();
  const { user } = useAuthContext();

  const onLeave = () => console.log('leave room button clicked');

  return (
    <div>
      <NavBar />
      <Footer partnername={partner} username={user} onLeave={onLeave} />
    </div>
  );
};
