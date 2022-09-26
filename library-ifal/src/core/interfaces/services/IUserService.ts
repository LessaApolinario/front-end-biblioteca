import User from '../../domain/models/User'
import AuthCredentialsDTO from '../../dto/AuthCredentialsDTO'

abstract class IUserService {
  abstract login(credentials: AuthCredentialsDTO): Promise<User>
  abstract logout(id: string, token: string): Promise<void>
  abstract register(name: string, username: string, email: string, password: string): Promise<void>
  abstract refreshSession(storagedToken: string): void
  abstract destroySession(): void
}

export default IUserService
