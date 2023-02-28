import { createRef, useContext, useState } from 'react';

import User from '../core/domain/models/User';

import UserBuilder from '../core/domain/builders/UserBuilder';

import { AuthCTX } from '../ui/contexts/AuthCTX';

import AuthCredentialsDTO from '../core/domain/types/AuthCredentialsDTO';

import { useNavigate } from 'react-router-dom';

import { useNotifications } from './useNotifications';

export function useAuth() {
  const { notifySuccess, notifyError } = useNotifications();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const nameRef = createRef<HTMLInputElement>();
  const usernameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const confirmPasswordRef = createRef<HTMLInputElement>();
  const authCTX = useContext(AuthCTX);
  const user = authCTX.user;
  const navigate = useNavigate();

  async function handleRegister() {
    await register(buildUser());
  }

  function buildUser() {
    return new UserBuilder(nameRef.current?.value)
      .withUsername(usernameRef.current?.value)
      .withEmail(emailRef.current?.value)
      .withPassword(passwordRef.current?.value)
      .build();
  }

  async function register(user: User) {
    try {
      await authCTX.register(user);
      notifySuccess('Usuário registrado com sucesso!');
      navigate('/');
    } catch (error) {
      notifyError('Erro ao registrar um usuário');
    }
  }

  async function handleLogin() {
    const usernameInput = usernameRef.current;
    const passwordInput = passwordRef.current;
    const username = usernameInput?.value ?? '';
    const password = passwordInput?.value ?? '';

    await login({ username, password });
  }

  async function login({ username, password }: AuthCredentialsDTO) {
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

  async function logout() {
    try {
      authCTX.logout();
      setIsAuthenticated(false);
      notifySuccess('Logout realizado com sucesso!');
      navigate('/');
    } catch (error) {
      notifyError('Erro ao realizar logout');
    }
  }

  return {
    isAuthenticated,
    handleRegister,
    handleLogin,
    logout,
    user,
    refs: { nameRef, usernameRef, emailRef, passwordRef, confirmPasswordRef },
  };
}
