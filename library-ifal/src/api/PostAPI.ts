import Post from '../core/domain/models/Post'
import IPostAPI from '../core/interfaces/api/IPostAPI'

class PostAPI extends IPostAPI {
  async fetch(): Promise<Post[]> {
    const response = await this.client.get('/api/posts')
    const posts: Post[] = response.data.map((item: Record<string, unknown>) => {
      return Post.fromJSON(item)
    })

    return posts
  }

  async create(post: Post): Promise<void> {
    await this.client.post('/api/posts',
      JSON.stringify(post.toJSON()), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

export default PostAPI
