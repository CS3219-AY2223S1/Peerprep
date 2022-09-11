import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/room/footer';
import NavBar from '../components/common/NavBar';
import { useSocketContext } from '../contexts/SocketContext';
import { useAuthContext } from '../contexts/AuthContext';

export default () => {
  const { partner, roomId } = useSocketContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  // route user back if user enter invalid room url
  useEffect(() => {
    if (roomId !== id) {
      navigate('/match');
    }
  }, []);

  const onLeave = () => console.log('leave room button clicked');

  return (
    <div>
      <NavBar />
      <Footer partnername={partner} username={user} onLeave={onLeave} />
    </div>
  );
};
