import { useCallback, useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useNotifications } from './useNotifications';

import { AuthCTX } from '../ui/contexts/AuthCTX';

import User from '../core/domain/models/User';

import AuthCredentialsDTO from '../core/domain/types/AuthCredentialsDTO';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const authCTX = useContext(AuthCTX);
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useNotifications();

  const register = useCallback(
    (user: User) => tryToRegister(user),
    [tryToRegister]
  );

  async function tryToRegister(user: User) {
    try {
      await authCTX.register(user);
      notifySuccess('Usuário registrado com sucesso!');
      navigate('/');
    } catch (error) {
      notifyError('Erro ao registrar um usuário');
    }
  }

  const login = useCallback(
    ({ username, password }: AuthCredentialsDTO) =>
      tryToLogin({ username, password }),
    [tryToLogin]
  );

  async function tryToLogin({ username, password }: AuthCredentialsDTO) {
    try {
      const success = await authCTX.login({ username, password });

      if (success) {
        setIsAuthenticated(success);
        notifySuccess('Login realizado com sucesso!');
        navigate('/');
      }
    } catch (error) {
      notifyError('Erro ao realizar login');
    }
  }

  const logout = useCallback(() => tryToLogout(), [tryToLogout]);

  async function tryToLogout() {
    try {
      authCTX.logout();
      setIsAuthenticated(false);
      notifySuccess('Logout realizado com sucesso!');
      navigate('/');
    } catch (error) {
      notifyError('Erro ao realizar logout');
    }
  }

  const getUser = useCallback(
    () => ({
      user: authCTX.user,
    }),
    [authCTX.user]
  );

  return {
    isAuthenticated,
    register,
    login,
    logout,
    getUser,
  };
}
