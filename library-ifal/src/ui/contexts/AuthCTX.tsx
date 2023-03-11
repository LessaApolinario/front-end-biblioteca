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

  async function login(credentials: AuthCredentialsDTO) {
    if (isInvalid(credentials)) {
      return false;
    }

    const userService = getUserService();
    const user = await userService.login(credentials);

    if (!hasData(user)) {
      return false;
    }

    refreshSession(user, user?.access_token ?? '');

    createSession(user);

    return true;
  }

  function createSession(user: User) {
    setItem('user', user);
    setItem('token', user?.access_token ?? '');
    setItem('id', user?.id ?? '');
  }

  function hasData(user: User) {
    return !user.access_token || !user.id;
  }

  function isInvalid(credentials: AuthCredentialsDTO) {
    return !credentials.username || !credentials.password;
  }

  async function logout() {
    const userService = getUserService();
    await userService.logout(
      getIdFromLocalStorage(),
      getTokenFromLocalStorage()
    );
    userService.destroySession();
    removeUserFromLocalStorage();
  }

  function removeUserFromLocalStorage() {
    removeItem('user');
    removeItem('id');
    removeItem('token');
    setUser(undefined);
  }

  function getIdFromLocalStorage() {
    return getItem<string>('id') ?? '';
  }

  async function register(user: User) {
    const userService = getUserService();
    await userService.register(user);
  }

  function refreshSession(user: User, token: string) {
    const userService = getUserService();
    setUser(user);
    userService.refreshSession(token);
  }

  function getUserService() {
    const webDiContainer = new WebDIContainer();
    return webDiContainer.getUserService();
  }

  function getUserFromLocalStorage() {
    return getItem<User>('user') as User;
  }

  function getTokenFromLocalStorage() {
    return getItem<string>('token') ?? '';
  }

  return (
    <AuthCTX.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthCTX.Provider>
  );
}

export default AuthProvider;
