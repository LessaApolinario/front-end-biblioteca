import UserAPI from '../api/UserAPI'
import User from '../core/domain/models/User'
import AuthCredentialsDTO from '../core/dto/AuthCredentialsDTO'
import IUserService from '../core/interfaces/services/IUserService'

class UserService extends IUserService {
  login(credentials: AuthCredentialsDTO): Promise<User> {
    return new UserAPI().login(credentials)
  }

  async logout(id: string, token: string): Promise<void> {
    await new UserAPI().logout(id, token)
  }

  async register(user: User): Promise<void> {
    await new UserAPI().register(user)
  }
}

export default UserService
