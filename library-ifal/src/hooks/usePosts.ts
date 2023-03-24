import { useCallback, useContext, useEffect } from 'react';

import { PostCTX } from '../ui/contexts/PostCTX';

import Post from '../core/domain/models/Post';

export function usePosts() {
  const postCTX = useContext(PostCTX);

  useEffect(() => {
    async function loadPosts() {
      await fetch();
    }

    loadPosts();
  }, [postCTX.posts]);

  const fetch = useCallback(() => fetchPosts(), [fetchPosts]);

  async function fetchPosts() {
    await postCTX.fetch();
  }

  const create = useCallback((post: Post) => createPost(post), [createPost]);

  async function createPost(post: Post) {
    await postCTX.create(post);
  }

  const getPosts = useCallback(
    () => ({
      posts: postCTX.posts,
    }),
    [postCTX.posts]
  );

  return {
    create,
    getPosts,
  };
}
