import Comment from '../../domain/models/Comment';
import CommentAdapter from '../adapter/CommentAdapter';

abstract class ICommentService {
  constructor(protected readonly adapter: CommentAdapter) {}

  abstract create(comment: Comment): Promise<void>;
}

export default ICommentService;
