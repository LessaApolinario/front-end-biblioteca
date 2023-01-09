import { useContext, useState } from 'react'

import User from '../core/domain/models/User'

import { AuthCTX } from '../ui/contexts/AuthCTX'

import AuthCredentialsDTO from '../core/domain/dto/AuthCredentialsDTO'

import { useNavigate } from 'react-router-dom'

import { useNotifications } from './useNotifications'

export function useAuth() {
  const { notifySuccess, notifyError } = useNotifications()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const authCTX = useContext(AuthCTX)
  const user = authCTX.user
  const navigate = useNavigate()

  async function register(user: User) {
    try {
      await authCTX.register(user)
      notifySuccess('Usuário registrado com sucesso!')
      navigate('/')
    } catch (error) {
      notifyError('Erro ao registrar um usuário')
    }
  }

  async function login({ username, password }: AuthCredentialsDTO) {
    try {
      const success = await authCTX.login({ username, password })

      if (success) {
        setIsAuthenticated(true)
        notifySuccess('Login realizado com sucesso!')
        navigate('/')
      }
    } catch (error) {
      notifyError('Erro ao realizar login')
    }
  }

  async function logout() {
    try {
      authCTX.logout()
      setIsAuthenticated(false)
      notifySuccess('Logout realizado com sucesso!')
      navigate('/')
    } catch (error) {
      notifyError('Erro ao realizar logout')
    }
  }

  return {
    isAuthenticated,
    register,
    login,
    logout,
    user
  }
}
