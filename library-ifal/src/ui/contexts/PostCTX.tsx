import { ReactNode, createContext, useState } from 'react';

import Post from '../../core/domain/models/Post';

import WebDIContainer from '../../dicontainer/web';
import isEmpty from '../../core/utils/isEmpty';
import { useNotifications } from '../../hooks/useNotifications';
import { useAuth } from '../../hooks/useAuth';

interface PostCTXProps {
  posts?: Post[];
  fetch(): Promise<void>;
  create(post: Post): Promise<void>;
}

interface PostProviderProps {
  children: ReactNode;
}

export const PostCTX = createContext({} as PostCTXProps);

function PostProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { notifyError, notifySuccess } = useNotifications();
  const { isAuthenticated } = useAuth();

  async function fetch() {
    try {
      const webDiContainer = new WebDIContainer();
      const postService = webDiContainer.getPostService();
      const posts = await postService.fetch();

      if (!isEmpty(posts)) {
        setPosts(posts);
        notifySuccess('Posts listados com sucesso!');
      }
    } catch (error) {
      notifyError('Erro ao listar posts');
    }
  }

  async function create(post: Post) {
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

  return (
    <PostCTX.Provider value={{ posts, fetch, create }}>
      {children}
    </PostCTX.Provider>
  );
}

export default PostProvider;
