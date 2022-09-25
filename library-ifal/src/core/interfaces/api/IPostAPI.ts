import Post from '../../domain/models/Post'
import IAPI from './IAPI'

abstract class IPostAPI extends IAPI {
  abstract fetch(): Promise<Post[]>
  abstract create(post: Post): Promise<void>
}

export default IPostAPI
