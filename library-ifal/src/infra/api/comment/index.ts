import Comment from '../../../core/domain/models/Comment';
import CommentAdapter from '../../../core/interfaces/adapter/CommentAdapter';
import { APIClient } from '../clients/APIClient';

class CommentAPI extends CommentAdapter {
  async create(comment: Comment): Promise<void> {
    await APIClient.post('/api/comments', JSON.stringify(comment.toJSON()), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default CommentAPI;
