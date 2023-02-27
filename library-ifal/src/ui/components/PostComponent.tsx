import Post from '../../core/domain/models/Post';

import Text from './Text';

import checkForInvalidString from '../../core/utils/checkForInvalidString';
import formatDate from '../../core/utils/formatDate';

import styles from '../styles/components/PostComponent.module.scss';

interface PostComponentProps {
  data: Post;
}

function PostComponent({ data }: PostComponentProps) {
  return (
    <article className={styles.container}>
      <h3>
        {checkForInvalidString(data.user_name)}{' '}
        <span className={styles.date}>
          {checkForInvalidString(formatDate(data.created_at))}
        </span>
      </h3>
      <h4 className={styles.postTitle}>{checkForInvalidString(data.title)}</h4>

      <Text className={'primary'} text={data.content ?? ''} />
    </article>
  );
}

export default PostComponent;
