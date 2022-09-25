import Post from '../core/domain/models/Post'
import IPostAPI from '../core/interfaces/api/IPostAPI'

class PostAPI extends IPostAPI {
  async fetch(): Promise<Post[]> {
    const response = await this.client.get('/api/posts')
    const posts: Post[] = response.data.map((item: Record<string, unknown>) =>
      Post.fromJSON(item)
    )

    return posts
  }

  async create(title: string, content: string): Promise<Post> {
    const response = await this.client.post('/api/posts', JSON.stringify({ title, content }), {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return response.data
  }
}

export default PostAPI
