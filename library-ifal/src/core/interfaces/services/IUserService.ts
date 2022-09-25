import User from '../../domain/models/User'

abstract class IUserService {
  abstract login(): Promise<void>
  abstract logout(): Promise<void>
  abstract register(): Promise<User>
}

export default IUserService
