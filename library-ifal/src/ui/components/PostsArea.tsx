import { ReactNode, useState } from 'react';

import CreatePostForm from './CreatePostForm';
import ItemsList from './ItemsList';
import OpenCloseButton from './OpenCloseButton';
import PostComponent from './PostComponent';

import Post from '../../core/domain/models/Post';

import { useAuth } from '../../hooks/useAuth';
import { useFields } from '../../hooks/useFields';
import { useNotifications } from '../../hooks/useNotifications';
import { usePosts } from '../../hooks/usePosts';

import styles from '../styles/components/PostsArea.module.scss';
import PostBuilder from '../../core/domain/builders/PostBuilder';

function PostsArea() {
  const { user } = useAuth();
  const { validateInput, validateTextArea } = useFields();
  const { notifyError } = useNotifications();
  const { data, createPost } = usePosts();
  const [isVisible, setIsVisible] = useState(false);

  function renderItem(item: Post): ReactNode {
    return <PostComponent data={item} key={item.created_at} />;
  }

  function buildPost(
    titleRef: React.RefObject<HTMLInputElement>,
    contentRef: React.RefObject<HTMLTextAreaElement>
  ) {
    return new PostBuilder(user?.name)
      .withTitle(titleRef.current?.value)
      .withContent(contentRef.current?.value)
      .build();
  }

  async function handleCreatePost(
    titleRef: React.RefObject<HTMLInputElement>,
    contentRef: React.RefObject<HTMLTextAreaElement>
  ) {
    const titleInput = titleRef.current;
    const contentTextArea = contentRef.current;

    validateInput(titleInput);
    validateTextArea(contentTextArea);

    const post = buildPost(titleRef, contentRef);

    try {
      await createPost(post);
    } catch (error: any) {
      notifyError(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <h3>Área de posts</h3>

      <div className={styles.posts}>
        <OpenCloseButton
          className={'primary'}
          closeText={'Fechar'}
          addItemText={'Adicionar post'}
          isVisible={isVisible}
          onClick={() => setIsVisible(!isVisible)}
        />

        <CreatePostForm
          isVisible={isVisible}
          handleCreatePost={handleCreatePost}
        />

        <ItemsList<Post>
          data={data}
          orientation={'column'}
          renderItem={renderItem}
        />
      </div>
    </div>
  );
}

export default PostsArea;
