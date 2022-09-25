import CommentAPI from '../api/CommentAPI'
import ICommentService from '../core/interfaces/services/ICommentService'

class CommentService extends ICommentService {
  async create(_id: string, name: string, email: string, comment: string): Promise<void> {
    await new CommentAPI().create(_id, name, email, comment)
  }
}

export default CommentService
