import CommentAPI from '../api/CommentAPI'
import Comment from '../core/domain/models/Comment'
import ICommentService from '../core/interfaces/services/ICommentService'

class CommentService extends ICommentService {
  async create(comment: Comment): Promise<void> {
    await new CommentAPI().create(comment)
  }
}

export default CommentService
