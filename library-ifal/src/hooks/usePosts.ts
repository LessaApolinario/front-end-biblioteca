import { useCallback, useContext, useEffect } from 'react';

import { PostCTX } from '../ui/contexts/PostCTX';

import Post from '../core/domain/models/Post';

export function usePosts() {
  const postCTX = useContext(PostCTX);

  useEffect(() => {
    async function loadPosts() {
      await fetchPosts();
    }

    loadPosts();
  }, [postCTX.posts]);

  const fetchPosts = useCallback(async () => {
    await postCTX.fetch();
  }, []);

  const createPost = useCallback(async (post: Post) => {
    await postCTX.create(post);
  }, []);

  function getPosts() {
    return {
      posts: postCTX.posts,
    };
  }

  // async function handleCreatePost() {
  //   try {
  //     await createPost(buildPost());
  //   } catch (error: any) {
  //     notifyError(error.message);
  //   }
  // }

  // function buildPost() {
  //   return new PostBuilder(user?.name)
  //     .withTitle(titleRef.current?.value)
  //     .withContent(contentRef.current?.value)
  //     .build();
  // }

  return {
    createPost,
    getPosts,
  };
}
