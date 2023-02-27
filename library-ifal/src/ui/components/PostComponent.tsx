import Post from '../../core/domain/models/Post';

import checkInvalidAPIField from '../../core/utils/checkInvalidAPIField';
import formatDate from '../../core/utils/formatDate';

import styles from '../styles/components/PostComponent.module.scss';

import Text from './Text';

interface PostComponentProps {
  data: Post;
}

function PostComponent({ data }: PostComponentProps) {
  return (
    <article className={styles.container}>
      <h3>
        {checkInvalidAPIField(data.user_name)}{' '}
        <span className={styles.date}>
          {checkInvalidAPIField(formatDate(data.created_at))}
        </span>
      </h3>
      <h4 className={styles.postTitle}>{checkInvalidAPIField(data.title)}</h4>

      <Text className={'primary'} text={data.content ?? ''} />
    </article>
  );
}

export default PostComponent;
