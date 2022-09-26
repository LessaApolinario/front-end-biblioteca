import Post from '../core/domain/models/Post'
import IPostAPI from '../core/interfaces/api/IPostAPI'

class PostAPI extends IPostAPI {
  async fetch(): Promise<Post[]> {
    const response = await this.client.get('/api/posts')
    const posts: Post[] = response.data.map((item: Record<string, unknown>) => {
      if (!item["user_name"]) {
        item["user_name"] = ''
      }

      if (!item["title"]) {
        item["title"] = ''
      }

      if (!item["content"]) {
        item["content"] = ''
      }

      if (!item["created_at"]) {
        item["created_at"] = ''
      }
      
      return Post.fromJSON(item)
    }
    )

    return posts
  }

  async create(title: string, content: string, user_name: string, user_id: string): Promise<void> {
    await this.client.post('/api/posts',
      JSON.stringify({ title, content, user_name, user_id }), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

export default PostAPI
