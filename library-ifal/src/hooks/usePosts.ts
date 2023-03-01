import { createRef, useEffect, useState } from 'react';

import Post from '../core/domain/models/Post';

import PostBuilder from '../core/domain/builders/PostBuilder';

import WebDIContainer from '../dicontainer/web';

import { useNotifications } from './useNotifications';
import { useAuth } from './useAuth';

export function usePosts() {
  const [data, setData] = useState<Post[]>();
  const { notifySuccess, notifyError } = useNotifications();
  const { isAuthenticated, user } = useAuth();
  const titleRef = createRef<HTMLInputElement>();
  const contentRef = createRef<HTMLTextAreaElement>();

  useEffect(() => {
    async function loadPosts() {
      await fetchPosts();
    }

    loadPosts();
  }, [data]);

  async function fetchPosts() {
    try {
      const webDiContainer = new WebDIContainer();
      const postService = webDiContainer.getPostService();
      const posts = await postService.fetch();
      setData(posts);
      notifySuccess('Posts listados com sucesso!');
    } catch (error) {
      notifyError('Erro ao listar posts');
    }
  }

  async function handleCreatePost() {
    try {
      await createPost(buildPost());
    } catch (error: any) {
      notifyError(error.message);
    }
  }

  function buildPost() {
    return new PostBuilder(user?.name)
      .withTitle(titleRef.current?.value)
      .withContent(contentRef.current?.value)
      .build();
  }

  async function createPost(post: Post) {
    if (!isAuthenticated) {
      throw new Error('Aviso: é preciso estar logado para criar posts.');
    }

    try {
      const webDiContainer = new WebDIContainer();
      const postService = webDiContainer.getPostService();
      await postService.create(post);
      notifySuccess('Post criado com sucesso!');
    } catch (error) {
      notifyError('Erro ao criar post');
    }
  }

  return {
    data,
    handleCreatePost,
    fetchPosts,
    refs: { titleRef, contentRef },
  };
}
