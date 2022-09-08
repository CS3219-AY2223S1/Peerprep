import React, {
  createContext, useContext, useEffect, useMemo, useReducer,
} from 'react';
import { useCookies } from 'react-cookie';
import { decodeToken, isExpired } from 'react-jwt';

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }
  return context;
};

interface Action {
  type: string
  payload?: {
    user: String;
  };
}

interface User {
  username: String;
}

interface UserCred {
  username: String;
  id: String;
  iat: Number;
  exp: Number;
}

type ProviderProps = {
  children: React.ReactNode;
};

const authReducer = (state: User, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cookie, setCookie, removeCookie] = useCookies(['userCred']);
  const [state, dispatch] = useReducer(authReducer, {
    user: cookie.userCred ? (decodeToken(cookie.userCred) as UserCred).username : null,
  });

  console.log('Authcontext state, cookie', state, cookie);

  const checkLogin = () => {
    if (cookie.userCred) {
      // log user out if jwt expired
      if (isExpired(cookie.userCred)) {
        removeCookie('userCred', { path: '/' });
        dispatch({ type: 'LOGOUT' });
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const value = useMemo(() => ({
    ...state, dispatch, cookie, setCookie,
  }), [state, cookie]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
