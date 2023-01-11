import Comment from '../domain/models/Comment';
import ICommentService from '../interfaces/services/ICommentService';

class CommentService extends ICommentService {
  create(comment: Comment): Promise<void> {
    return this.adapter.create(comment);
  }
}

export default CommentService;
