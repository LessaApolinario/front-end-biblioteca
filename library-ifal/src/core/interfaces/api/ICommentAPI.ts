import IAPI from './IAPI'

abstract class ICommentAPI extends IAPI {
  abstract create(_id: string, name: string, email: string, comment: string): Promise<void>
}

export default ICommentAPI
