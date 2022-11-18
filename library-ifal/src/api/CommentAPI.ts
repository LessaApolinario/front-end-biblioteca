import Comment from '../core/domain/models/Comment'
import ICommentAPI from '../core/interfaces/api/ICommentAPI'

class CommentAPI extends ICommentAPI {
  async create(comment: Comment): Promise<void> {
    await this.client.post('/api/comments',
      JSON.stringify(comment.toJSON()), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default CommentAPI
