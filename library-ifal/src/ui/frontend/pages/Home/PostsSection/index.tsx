import { useState } from 'react';
import { OpenCloseButton } from '../../../components/OpenCloseButton';
import { CreatePostForm } from './CreatePostForm';
import { ListPosts } from './ListPosts';
import styles from './styles.module.scss';

function PostsSection() {
  const [isVisible, setIsVisible] = useState(false);

  function toggleIsVisible() {
    setIsVisible(!isVisible);
  }

  return (
    <div className={styles.container}>
      <h3>Área de posts</h3>

      <div className={styles.posts}>
        <OpenCloseButton
          isVisible={isVisible}
          dataTitle={'Adicionar post'}
          toggle={toggleIsVisible}
        />
        <CreatePostForm isVisible={isVisible} />
        <ListPosts />
      </div>
    </div>
  );
}

export { PostsSection };
