import Post from '../domain/models/Post';
import IPostService from '../interfaces/services/IPostService';

class PostService extends IPostService {
  fetch(): Promise<Post[]> {
    return this.adapter.fetch();
  }

  create(post: Post): Promise<void> {
    return this.adapter.create(post);
  }
}

export default PostService;
