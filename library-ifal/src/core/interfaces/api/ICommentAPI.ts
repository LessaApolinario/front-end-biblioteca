import Comment from '../../domain/models/Comment'
import IAPI from './IAPI'

abstract class ICommentAPI extends IAPI {
  abstract create(comment: Comment): Promise<void>
}

export default ICommentAPI
