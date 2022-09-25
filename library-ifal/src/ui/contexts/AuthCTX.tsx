import { createContext, ReactNode, useEffect, useState } from 'react'

import User from '../../core/domain/models/User'
import AuthCredentialsDTO from '../../core/dto/AuthCredentialsDTO'
import UserService from '../../services/UserService'

interface AuthCTXProps {
  signed: boolean
  user: User | undefined
  login(user: AuthCredentialsDTO): Promise<boolean>
  logout(): void
  register(name: string, username: string, email: string, password: string): Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthCTX = createContext({} as AuthCTXProps)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const storagedUser = localStorage.getItem('user')
    const storagedToken = localStorage.getItem('token')

    if (storagedToken && storagedUser) {
      const _user = JSON.parse(storagedUser) as User
      setUser(_user)
      const userService = new UserService()
      userService.refreshSession(storagedToken)
    }
  }, [])

  const login = async (credentials: AuthCredentialsDTO) => {
    if (!credentials.username || !credentials.password) {
      return false
    }

    const userService = new UserService()
    const data = await userService.login(credentials)
    const { access_token, id } = data

    if (!access_token) {
      return false
    }

    if (!id) {
      return false
    }

    userService.refreshSession(access_token)

    const newUser: User = data
    setUser(newUser)

    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('token', JSON.stringify(access_token))
    localStorage.setItem('id', JSON.stringify(id))

    return true
  }

  const logout = async () => {
    const storagedId = localStorage.getItem('id')
    const storagedToken = localStorage.getItem('token')

    if (!storagedId || !storagedToken) {
      return
    }

    const id: string = JSON.parse(storagedId)
    const token: string = JSON.parse(storagedToken)

    const userService = new UserService()
    userService.logout(id, token)
    userService.destroySession()

    localStorage.removeItem('user')
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    setUser(undefined)
  }

  const register = async (name: string, username: string, email: string, password: string) => {
    const userService = new UserService()
    await userService.register(name, username, email, password)
  }

  return (
    <AuthCTX.Provider value={{ signed: Boolean(user), user, login, logout, register }}>
      {children}
    </AuthCTX.Provider>
  )
}

export default AuthProvider
