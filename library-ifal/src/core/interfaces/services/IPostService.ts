import Post from '../../domain/models/Post';
import PostAdapter from '../adapter/PostAdapter';

abstract class IPostService {
  constructor(protected readonly adapter: PostAdapter) {}

  abstract fetch(): Promise<Post[]>;
  abstract create(post: Post): Promise<void>;
}

export default IPostService;
