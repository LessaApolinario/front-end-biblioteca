import User from '../../domain/models/User'
import AuthCredentialsDTO from '../../dto/AuthCredentialsDTO'

abstract class IUserService {
  abstract login(credentials: AuthCredentialsDTO): Promise<User>
  abstract logout(id: string, token: string): Promise<void>
  abstract register(user: User): Promise<void>
}

export default IUserService
