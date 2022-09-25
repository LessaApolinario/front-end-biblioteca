import User from '../../domain/models/User'
import AuthCredentialsDTO from '../../dto/AuthCredentialsDTO'

abstract class IUserService {
  abstract login(credentials: AuthCredentialsDTO): Promise<User>
  abstract logout(): Promise<void>
  abstract register(): Promise<User>
}

export default IUserService
