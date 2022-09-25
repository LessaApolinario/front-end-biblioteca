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

  async register(user: User): Promise<void> {
    await this.client.post('/api/auth/register', JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

export default UserAPI
