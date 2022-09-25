import PostAPI from '../api/PostAPI'
import Post from '../core/domain/models/Post'
import IPostService from '../core/interfaces/services/IPostService'

class PostService extends IPostService {
  fetch(): Promise<Post[]> {
    return new PostAPI().fetch()
  }

  async create(title: string, content: string, name: string, user_id: string): Promise<void> {
    await new PostAPI().create(title, content, name, user_id)
  }
}

export default PostService
