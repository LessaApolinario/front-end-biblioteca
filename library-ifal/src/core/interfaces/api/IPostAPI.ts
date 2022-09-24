import Post from '../../domain/models/Post'

abstract class IPostAPI {
  abstract fetch(): Promise<Post[]>
  abstract create(post: Post): Promise<void>
}

export default IPostAPI
