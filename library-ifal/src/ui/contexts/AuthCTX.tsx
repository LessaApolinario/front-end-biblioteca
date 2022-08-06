import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthCredentialsDTO from '../../core/dto/AuthCredentialsDTO'
import LogoutResponseDTO from '../../core/dto/LogoutResponseDTO'

import User from '../../core/models/User'

import api from '../../services/api'

interface AuthCTXProps {
  signed: boolean
  user: User | undefined
  login(user: AuthCredentialsDTO): Promise<boolean>
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

  useEffect(() => {
    const storagedUser = localStorage.getItem('user')
    const storagedToken = localStorage.getItem('token')

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser))
      api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`
    }
  }, [])

  const login = async (credentials: AuthCredentialsDTO) => {
    if (credentials.username !== '' && credentials.password !== '') {
      const response = await api.post<User>(
        '/api/auth/login', 
        JSON.stringify(credentials), {
          headers: {
            'Content-type': 'application/json'
          }
        }
      )

      const { access_token, id } = response.data

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

      const newUser: User = response.data

      setUser(newUser)

      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('token', JSON.stringify(access_token))
      localStorage.setItem('id', JSON.stringify(id))

      return true
    }
    
    return false
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

      api.defaults.headers.common['Authorization'] = ''
    } catch (error) {
      console.log(error)
    }
    
    localStorage.removeItem('user')
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    setUser(undefined)
  }

  return (
    <AuthCTX.Provider value={{ signed: Boolean(user), user, login, logout }}>
      {children}
    </AuthCTX.Provider>
  )
}

export default AuthProvider
