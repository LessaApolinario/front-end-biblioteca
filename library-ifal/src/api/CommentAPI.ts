import ICommentAPI from '../core/interfaces/api/ICommentAPI'

class CommentAPI extends ICommentAPI {
  async create(_id: string, name: string, email: string, comment: string): Promise<void> {
    await this.client.post('/api/comments', JSON.stringify({ _id, name, email, comment }))
  }
}

export default CommentAPI
