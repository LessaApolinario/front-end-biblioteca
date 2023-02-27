import Review from '../../core/domain/models/Review';

import checkInvalidAPIField from '../../core/utils/checkInvalidAPIField';
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
        {checkInvalidAPIField(data.name)} sobre{' '}
        {checkInvalidAPIField(data.title_book)} de{' '}
        {checkInvalidAPIField(data.writer)}:
      </h3>

      <p
        className={styles.review}
        title="Clique para ver detalhes da resenha"
        onClick={onClick}
      >
        {checkInvalidAPIField(data.review)}
      </p>

      <p className={styles.date}>
        {formatDate(checkInvalidAPIField(data.created_at))}
      </p>
    </article>
  );
}

export default ReviewItem;
