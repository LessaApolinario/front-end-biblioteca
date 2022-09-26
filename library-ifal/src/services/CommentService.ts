import CommentAPI from '../api/CommentAPI'
import ICommentService from '../core/interfaces/services/ICommentService'

class CommentService extends ICommentService {
  async create(name: string, email: string, comment: string): Promise<void> {
    await new CommentAPI().create(name, email, comment)
  }
}

export default CommentService
