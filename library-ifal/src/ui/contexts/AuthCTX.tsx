import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginResponseDTO from '../../core/dto/LoginResponseDTO'
import LogoutResponseDTO from '../../core/dto/LogoutResponseDTO'

import User from '../../core/models/User'

import api from '../../services/api'

interface AuthCTXProps {
  user: User | undefined
  login(user: User): Promise<string>
  logout(): void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthCTX = createContext({} as AuthCTXProps)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }

    // eslint-disable-next-line
  }, [user])

  const login = async (user: User) => {
    if (user) {
      const { data, status, statusText } = await api.post<LoginResponseDTO>(
        '/api/auth/login', 
        JSON.stringify(user), {
          headers: {
            'Content-type': 'application/json'
          }
        }
      )

      if (data && status === 200 && statusText === 'OK') {
        const { id, name, access_token } = data
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', access_token)
        localStorage.setItem('id', id)
        
        user._id = id
        user.name = name
        setUser(user)
      }

      return 'Sucesso ao logar'
    }
    
    return 'Fail'
  }

  const logout = async () => {
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')

    try {
      await api.post<LogoutResponseDTO>(
        'api/auth/logout', 
        JSON.stringify({ id, token }), {
          headers: {
            'Content-type': 'application/json'
          }
      })
    } catch (error) {
      console.log(error)
    }
    
    localStorage.removeItem('user')
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    setUser(undefined)
  }

  return (
    <AuthCTX.Provider value={{ user, login, logout }}>
      {children}
    </AuthCTX.Provider>
  )
}

export default AuthProvider
