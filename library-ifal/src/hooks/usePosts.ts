import { useEffect, useState } from 'react';

import Post from '../core/domain/models/Post';

import { useNotifications } from './useNotifications';
import { useAuth } from './useAuth';
import WebDIContainer from '../dicontainer/web';

export function usePosts() {
  const [data, setData] = useState<Post[]>();
  const { notifySuccess, notifyError } = useNotifications();
  const { isAuthenticated } = useAuth();
  const diContainer = new WebDIContainer();
  const service = diContainer.getPostService();

  useEffect(() => {
    async function loadPosts() {
      await fetchPosts();
    }

    loadPosts();
  }, [data]);

  async function fetchPosts() {
    try {
      const posts = await service.fetch();
      setData(posts);
      notifySuccess('Posts listados com sucesso!');
    } catch (error) {
      notifyError('Erro ao listar posts');
    }
  }

  async function createPost(post: Post) {
    if (!isAuthenticated) {
      throw new Error('Aviso: é preciso estar logado para criar posts.');
    }

    try {
      await service.create(post);
      notifySuccess('Post criado com sucesso!');
    } catch (error) {
      notifyError('Erro ao criar post');
    }
  }

  return {
    data,
    createPost,
    fetchPosts,
  };
}
