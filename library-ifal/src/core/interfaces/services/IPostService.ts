import Post from '../../domain/models/Post'

abstract class IPostService {
  abstract fetch(): Promise<Post[]>
  abstract create(
    title: string,
    content: string,
    name: string,
    user_id: string
  ): Promise<void>
}

export default IPostService
