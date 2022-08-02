import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginResponseDto from '../../core/dto/LoginResponseDTO'
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
      const { data, status, statusText } = await api.post<LoginResponseDto>(
        '/api/auth/login', 
        JSON.stringify(user), {
          headers: {
            'Content-type': 'application/json'
          }
        }
      )
      
      if (data && status === 200 && statusText === 'OK') {
        const { access_token } = data
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', access_token)
        
        setUser(user)
      }

      return 'Success'
    }
    
    return 'Fail'
  }

  const logout = async () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(undefined)

    await api.post('/api/auth/logout', {}, { headers: {
      'Content-type': 'application/json'
    }})
  }

  return (
    <AuthCTX.Provider value={{ user, login, logout }}>
      {children}
    </AuthCTX.Provider>
  )
}

export default AuthProvider
