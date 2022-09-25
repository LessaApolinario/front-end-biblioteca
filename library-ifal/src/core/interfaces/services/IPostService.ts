import Post from '../../domain/models/Post'

abstract class IPostService {
  abstract fetch(): Promise<Post[]>
  abstract create(title: string, content: string): Promise<Post>
}

export default IPostService
