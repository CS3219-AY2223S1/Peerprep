import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { useAuthContext } from '../../contexts/AuthContext';
import { CommunicationSocket } from '../../constants';
import { useSocketContext } from '../../contexts/SocketContext';

const socket = io('http://localhost:8002');

const Chat = () => {
  const [stream, setStream] = useState<MediaStream>();
  const myVideo = useRef<HTMLVideoElement>();
  const userVideo = useRef<HTMLVideoElement>();
  const connectionRef = useRef<any>();
  const { roomUuid } = useSocketContext();
  const { user } = useAuthContext();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((curStream) => {
      setStream(curStream);
      myVideo.current.srcObject = curStream;
    });
  }, []);

  useEffect(() => {
    if (roomUuid) {
      socket.emit(CommunicationSocket.JOIN_ROOM, { roomUuid, user });
    }
    socket.on(CommunicationSocket.IN_ROOM, (data) => {
      if (data.user !== user && stream) {
        callUser();
      }
    });
    socket.on(CommunicationSocket.CALL_USER, (data) => {
      if (stream) {
        answerCall(data.signal);
      }
    });
  }, [stream]);

  useEffect(() => {
    socket.on(CommunicationSocket.CALL_ENDED, () => {
      handleDisconnect();
    });
  }, []);

  const callUser = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit(CommunicationSocket.CALL_USER, {
        roomToCall: roomUuid,
        signalData: data,
      });
    });

    peer.on('stream', (curStream) => {
      userVideo.current.srcObject = curStream;
    });

    socket.on('callAccepted', (signal) => {
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = (callerSignal) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit(CommunicationSocket.CALL_ANSWERED, {
        signal: data,
        to: roomUuid,
      });
    });

    peer.on('stream', (curStream) => {
      userVideo.current.srcObject = curStream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const handleDisconnect = () => {
    leaveCall();
    window.location.reload();
  };

  const leaveCall = () => {
    if (connectionRef.current) connectionRef.current.destroy();
    if (userVideo.current.srcObject) userVideo.current.srcObject = null;
  };

  return (
    <div className="flex relative w-full space-x-1">
      <video playsInline muted ref={userVideo} autoPlay className="w-1/2 rounded-lg" />
      <video playsInline muted ref={myVideo} autoPlay className="w-1/2 rounded-lg" />
    </div>
  );
};

export default Chat;
