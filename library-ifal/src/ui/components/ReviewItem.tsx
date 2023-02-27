import Review from '../../core/domain/models/Review';

import checkForInvalidString from '../../core/utils/checkForInvalidString';
import formatDate from '../../core/utils/formatDate';

import styles from '../styles/components/Review.module.scss';

interface ReviewItemProps {
  data: Review;
  onClick?(): void;
}

function ReviewItem({ data, onClick }: ReviewItemProps) {
  return (
    <article className={styles.container}>
      <h3>
        {checkForInvalidString(data.name)} sobre{' '}
        {checkForInvalidString(data.title_book)} de{' '}
        {checkForInvalidString(data.writer)}:
      </h3>

      <p
        className={styles.review}
        title="Clique para ver detalhes da resenha"
        onClick={onClick}
      >
        {checkForInvalidString(data.review)}
      </p>

      <p className={styles.date}>
        {formatDate(checkForInvalidString(data.created_at))}
      </p>
    </article>
  );
}

export default ReviewItem;
