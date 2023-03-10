import { createContext, ReactNode, useEffect, useState } from 'react';

import User from '../../core/domain/models/User';
import AuthCredentialsDTO from '../../core/domain/types/AuthCredentialsDTO';

import { useLocalStorage } from '../../hooks/useLocalStorage';

import WebDIContainer from '../../dicontainer/web';

interface AuthCTXProps {
  user: User | undefined;
  login(user: AuthCredentialsDTO): Promise<boolean>;
  logout(): void;
  register(user: User): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthCTX = createContext({} as AuthCTXProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const { setItem, getItem, removeItem } = useLocalStorage<User>();

  useEffect(() => {
    refreshSession(getUserFromLocalStorage(), getTokenFromLocalStorage());
  }, []);

  function refreshSession(user: User, token: string) {
    const webDiContainer = new WebDIContainer();
    const userService = webDiContainer.getUserService();
    setUser(user);
    userService.refreshSession(token);
  }

  function getUserFromLocalStorage() {
    return getItem<User>('user') as User;
  }

  function getTokenFromLocalStorage() {
    return getItem<string>('token') ?? '';
  }

  async function login(credentials: AuthCredentialsDTO) {
    if (!credentials.username || !credentials.password) {
      return false;
    }

    const webDiContainer = new WebDIContainer();
    const userService = webDiContainer.getUserService();

    const data = await userService.login(credentials);
    const { access_token, id } = data;

    if (!access_token) {
      return false;
    }

    if (!id) {
      return false;
    }

    userService.refreshSession(access_token);

    const newUser: User = data;
    setUser(newUser);

    setItem('user', newUser);
    setItem('token', access_token);
    setItem('id', id);

    return true;
  }

  const logout = async () => {
    const webDiContainer = new WebDIContainer();
    const userService = webDiContainer.getUserService();

    const storedId = getItem<string>('id') ?? '';
    const storedToken = getItem<string>('token') ?? '';

    await userService.logout(storedId, storedToken);
    userService.destroySession();

    removeItem('user');
    removeItem('id');
    removeItem('token');

    setUser(undefined);
  };

  const register = async (user: User) => {
    const webDiContainer = new WebDIContainer();
    const userService = webDiContainer.getUserService();
    await userService.register(user);
  };

  return (
    <AuthCTX.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthCTX.Provider>
  );
}

export default AuthProvider;
