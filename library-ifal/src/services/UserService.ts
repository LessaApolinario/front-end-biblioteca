import UserAPI from '../api/UserAPI'
import User from '../core/domain/models/User'
import AuthCredentialsDTO from '../core/dto/AuthCredentialsDTO'
import IUserService from '../core/interfaces/services/IUserService'

class UserService extends IUserService {
  login(credentials: AuthCredentialsDTO): Promise<User> {
    return await new UserAPI().login(credentials)
  }
  
  async logout(id: string, token: string): Promise<void> {
    await new UserAPI().logout(id, token)
  }
  
  async register(name: string, username: string, email: string, password: string): Promise<void> {
    await new UserAPI().register(name, username, email, password)
  }
  
  refreshSession(storagedToken: string): void {
    new UserAPI().refreshSession(storagedToken)
  }

  destroySession(): void {
    new UserAPI().destroySession()
  }
}

export default UserService
