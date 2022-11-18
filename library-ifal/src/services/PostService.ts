import PostAPI from '../api/PostAPI'
import Post from '../core/domain/models/Post'
import IPostService from '../core/interfaces/services/IPostService'

class PostService extends IPostService {
  fetch(): Promise<Post[]> {
    return new PostAPI().fetch()
  }

  async create(post: Post): Promise<void> {
    await new PostAPI().create(post)
  }
}

export default PostService
