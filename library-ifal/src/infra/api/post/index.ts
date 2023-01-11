import Post from '../../../core/domain/models/Post';
import { DTO } from '../../../core/domain/types/DTO';
import PostAdapter from '../../../core/interfaces/adapter/PostAdapter';
import { APIClient } from '../clients/APIClient';

class PostAPI extends PostAdapter {
  async fetch(): Promise<Post[]> {
    const response = await APIClient.get<DTO[]>('/api/posts');
    return response.data.map(Post.fromJSON);
  }

  async create(post: Post): Promise<void> {
    await APIClient.post('/api/posts', JSON.stringify(post.toJSON()), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default PostAPI;
