import Post from '../../domain/models/Post';

abstract class PostAdapter {
  abstract fetch(): Promise<Post[]>;
  abstract create(post: Post): Promise<void>;
}

export default PostAdapter;
