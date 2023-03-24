import { ReactNode, createContext, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';

import Post from '../../core/domain/models/Post';

import WebDIContainer from '../../dicontainer/web';

import isEmpty from '../../core/utils/isEmpty';

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
      await tryToFetchPosts();
    } catch (error) {
      logError('Erro ao listar posts');
    }
  }

  async function tryToFetchPosts() {
    changeStateAndLogSuccessIfDataExists(await fetchPosts());
  }

  function changeStateAndLogSuccessIfDataExists(posts: Post[]) {
    if (!isEmpty(posts)) {
      setPosts(posts);
      logSuccess('Posts listados com sucesso!');
    }
  }

  async function fetchPosts() {
    const postService = getPostService();
    return await postService.fetch();
  }

  async function create(post: Post) {
    if (!isAuthenticated) {
      throw new Error('Aviso: é preciso estar logado para criar posts.');
    }

    try {
      await tryToCreatePost(post);
    } catch (error) {
      logError('Erro ao criar post');
    }
  }

  async function tryToCreatePost(post: Post) {
    await createPost(post);
    logSuccess('Post criado com sucesso!');
  }

  async function createPost(post: Post) {
    const postService = getPostService();
    await postService.create(post);
  }

  function getPostService() {
    const webDiContainer = new WebDIContainer();
    return webDiContainer.getPostService();
  }

  function logSuccess(message: string) {
    notifySuccess(message);
  }

  function logError(error: string) {
    notifyError(error);
  }

  return (
    <PostCTX.Provider value={{ posts, fetch, create }}>
      {children}
    </PostCTX.Provider>
  );
}

export default PostProvider;
