import ICommentAPI from '../core/interfaces/api/ICommentAPI'

class CommentAPI extends ICommentAPI {
  async create(name: string, email: string, comment: string): Promise<void> {
    await this.client.post('/api/comments', JSON.stringify({ name, email, comment }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default CommentAPI
