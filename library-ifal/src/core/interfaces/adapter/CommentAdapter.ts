import Comment from '../../domain/models/Comment';

abstract class CommentAdapter {
  abstract create(comment: Comment): Promise<void>;
}

export default CommentAdapter;
