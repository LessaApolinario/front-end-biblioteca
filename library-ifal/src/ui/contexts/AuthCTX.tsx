import { createContext, ReactNode, useEffect, useState } from 'react'

import User from '../../core/domain/models/User'
import AuthCredentialsDTO from '../../core/dto/AuthCredentialsDTO'
import UserService from '../../services/UserService'

import { useLocalStorage } from '../../hooks/useLocalStorage'

interface AuthCTXProps {
  signed: boolean
  user: User | undefined
  login(user: AuthCredentialsDTO): Promise<boolean>
  logout(): void
  register(user: User): Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthCTX = createContext({} as AuthCTXProps)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const { setItem, getItem, removeItem } = useLocalStorage<User>()

  useEffect(() => {
    const storedUser = getItem<User>('user') as User
    const storedToken = getItem<string>('token') ?? ''

    setUser(storedUser)

    const userService = new UserService()
    userService.refreshSession(storedToken)
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

    setItem('user', newUser)
    setItem('token', access_token)
    setItem('id', id)

    return true
  }

  const logout = async () => {
    const storedId = getItem<string>('id') ?? ''
    const storedToken = getItem<string>('token') ?? ''

    const userService = new UserService()
    await userService.logout(storedId, storedToken)
    userService.destroySession()

    removeItem('user')
    removeItem('id')
    removeItem('token')

    setUser(undefined)
  }

  const register = async (user: User) => {
    const userService = new UserService()
    await userService.register(user)
  }

  return (
    <AuthCTX.Provider value={{ signed: Boolean(user), user, login, logout, register }}>
      {children}
    </AuthCTX.Provider>
  )
}

export default AuthProvider
