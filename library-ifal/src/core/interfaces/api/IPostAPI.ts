import Post from '../../domain/models/Post'
import IAPI from './IAPI'

abstract class IPostAPI extends IAPI {
  abstract fetch(): Promise<Post[]>
  abstract create(
    title: string,
    content: string,
    name: string,
    user_id: string
  ): Promise<Post>
}

export default IPostAPI
