import User from '../../domain/models/User'
import AuthCredentialsDTO from '../../dto/AuthCredentialsDTO'
import IAPI from './IAPI'

abstract class IUserAPI extends IAPI {
  abstract login(credentials: AuthCredentialsDTO): Promise<User>
  abstract logout(): Promise<void>
  abstract register(): Promise<User>
}

export default IUserAPI
