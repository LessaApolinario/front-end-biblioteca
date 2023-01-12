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
  const diContainer = new WebDIContainer();
  const service = diContainer.getUserService();

  useEffect(() => {
    const storedUser = getItem<User>('user') as User;
    const storedToken = getItem<string>('token') ?? '';
    setUser(storedUser);
    service.refreshSession(storedToken);
  }, []);

  const login = async (credentials: AuthCredentialsDTO) => {
    if (!credentials.username || !credentials.password) {
      return false;
    }

    const data = await service.login(credentials);
    const { access_token, id } = data;

    if (!access_token) {
      return false;
    }

    if (!id) {
      return false;
    }

    service.refreshSession(access_token);

    const newUser: User = data;
    setUser(newUser);

    setItem('user', newUser);
    setItem('token', access_token);
    setItem('id', id);

    return true;
  };

  const logout = async () => {
    const storedId = getItem<string>('id') ?? '';
    const storedToken = getItem<string>('token') ?? '';

    await service.logout(storedId, storedToken);
    service.destroySession();

    removeItem('user');
    removeItem('id');
    removeItem('token');

    setUser(undefined);
  };

  const register = async (user: User) => {
    await service.register(user);
  };

  return (
    <AuthCTX.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthCTX.Provider>
  );
}

export default AuthProvider;
