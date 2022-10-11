import React, {
  createContext, useContext, useMemo, useReducer,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthContext } from './AuthContext';

export const SocketContext = createContext(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw Error('useSocketContext must be used inside a SocketContextProvider');
  }
  return context;
};

type ProviderProps = {
  children: React.ReactNode;
};

interface Action {
  type: String
  payload?: State
}

interface State {
  partner: String;
  roomUuid: String;
  difficulty: String;
}

const socketReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'MATCHED':
      return { partner: action.payload.partner, roomUuid: action.payload.roomUuid, difficulty: action.payload.difficulty };
    case 'DISCONNECT':
      return { partner: null, roomUuid: null, difficulty: null };
    default:
      return state;
  }
};

export const SocketContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const { cookie } = useAuthContext();
  const [state, dispatch] = useReducer(socketReducer, {
    partner: null, roomUuid: null, difficulty: null,
  });
  // load socket if there is cookie
  const socket = useMemo<Socket>(() => {
    if (cookie.userCred) {
      return io('http://localhost:8001', { path: '/match', auth: { token: cookie.userCred } });
    }
    return null;
  }, [cookie]);

  const value = useMemo(() => ({
    ...state, dispatch, socket,
  }), [state, socket]);

  console.log('Socketcontext state:', state);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
