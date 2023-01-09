import User from '../../domain/models/User'
import AuthCredentialsDTO from '../../domain/dto/AuthCredentialsDTO'
import IAPI from './IAPI'

abstract class IUserAPI extends IAPI {
  abstract login(credentials: AuthCredentialsDTO): Promise<User>
  abstract logout(id: string, token: string): Promise<void>
  abstract register(user: User): Promise<void>
  abstract refreshSession(storedToken: string): void
  abstract destroySession(): void
}

export default IUserAPI
