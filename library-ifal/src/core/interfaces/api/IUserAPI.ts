import User from '../../domain/models/User'
import IAPI from './IAPI'

abstract class IUserAPI extends IAPI {
  abstract login(): Promise<void>
  abstract logout(): Promise<void>
  abstract register(): Promise<User>
}

export default IUserAPI
