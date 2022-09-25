import Post from '../../domain/models/Post'

abstract class IPostService {
  abstract fetch(): Promise<Post[]>
  abstract create(post: Post): Promise<void>
}

export default IPostService
