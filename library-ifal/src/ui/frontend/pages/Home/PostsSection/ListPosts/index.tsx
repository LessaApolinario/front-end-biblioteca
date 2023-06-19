import { ReactNode } from 'react';
import styles from './styles.module.scss';
import Post from '../../../../../../core/domain/models/Post';
import PostComponent from '../../../../../components/PostComponent';
import { usePosts } from '../../../../../../hooks/usePosts';

function ListPosts() {
  const { getPosts } = usePosts();
  const { posts } = getPosts();

  function renderItem(item: Post): ReactNode {
    return <PostComponent data={item} key={item.created_at} />;
  }

  return <div className={styles.container}>{posts?.map(renderItem)}</div>;
}

export { ListPosts };
