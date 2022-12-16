import { useContext, useState } from 'react'

import User from '../core/domain/models/User'

import { AuthCTX } from '../ui/contexts/AuthCTX'
import { toast } from 'react-toastify'
import AuthCredentialsDTO from '../core/dto/AuthCredentialsDTO'
import { useNavigate } from 'react-router-dom'

interface UserPartial {
  name: string | undefined
  username: string | undefined
  email: string | undefined
  password: string | undefined
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const authCTX = useContext(AuthCTX)
  const navigate = useNavigate()

  async function register(userPartial: UserPartial) {
    const user = new User()
    user.name = userPartial.name
    user.username = userPartial.username
    user.email = userPartial.email
    user.password = userPartial.password

    try {
      await authCTX.register(user)
      toast.success('Usuário registrado com sucesso!', {
        position: toast.POSITION.TOP_RIGHT,
      })
      navigate('/')
    } catch (error) {
      toast.error('Erro ao registrar um usuário', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  async function login({ username, password }: AuthCredentialsDTO) {
    try {
      const success = await authCTX.login({ username, password })

      if (success) {
        setIsAuthenticated(true)
        toast.success('Login realizado com sucesso!', {
          position: toast.POSITION.TOP_RIGHT
        })

        navigate('/')
      }
    } catch (error) {
      toast.error('Erro ao realizar login', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  async function logout() {
    try {
      authCTX.logout()
      setIsAuthenticated(false)

      toast.success('Logout com sucesso!', {
        position: toast.POSITION.TOP_RIGHT
      })

      navigate('/')
    } catch (error) {
      toast.error('Erro ao fazer logout', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  return {
    isAuthenticated,
    register,
    login,
    logout
  }
}
