import { type Dispatch, type ReactNode, createContext, useContext, useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { type AuthReducerActions, type AuthReducerState, authReducer, initialState } from './authReducer';

export const AUTH_COOKIE_NAME = 'current-user';

export type AuthContextProps = {
  authState: AuthReducerState;
  authDispatch: Dispatch<AuthReducerActions>;
};

export const AuthContext = createContext<AuthContextProps>({
  authState: { ...initialState },
  authDispatch: () => void 0,
});

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }): ReturnType<typeof AuthContext.Provider> => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [authState, authDispatch] = useReducer(authReducer, { ...initialState });

  useEffect(() => {
    // prevent unauthenticated users from accessing the HomeView
    if (authState.state !== 'logged-in' && pathname !== '/') {
      navigate('/', { replace: true });
      return;
    }

    // prevent authenticated users from accessing the login page
    if (authState.state === 'logged-in' && pathname === '/') {
      navigate('/home', { replace: true });
      return;
    }

    if (authState.state === 'logged-in' && authState.currentUser) {
      navigate('/home');
    }
  }, [authState, pathname, navigate]);

  return <AuthContext.Provider value={{ authState, authDispatch }}>{children}</AuthContext.Provider>;
};
