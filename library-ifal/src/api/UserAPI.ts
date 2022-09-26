import User from '../core/domain/models/User'
import AuthCredentialsDTO from '../core/dto/AuthCredentialsDTO'
import IUserAPI from '../core/interfaces/api/IUserAPI'

class UserAPI extends IUserAPI {
  async login(credentials: AuthCredentialsDTO): Promise<User> {
    const response = await this.client.post('/api/auth/login',
      JSON.stringify(credentials), {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return response.data
  }

  async logout(id: string, token: string): Promise<void> {
    await this.client.post('/api/auth/logout',
      JSON.stringify({ id, token }), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  async register(name: string, username: string, email: string, password: string): Promise<void> {
    const userJSON: Record<string, unknown> = {
      name,
      username,
      email,
      password,
    }
    const user = User.fromJSON(userJSON)

    await this.client.post('/api/auth/register', JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  refreshSession(storagedToken: string): void {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`
  }

  destroySession(): void {
    this.client.defaults.headers.common['Authorization'] = ''
  }
}

export default UserAPI
