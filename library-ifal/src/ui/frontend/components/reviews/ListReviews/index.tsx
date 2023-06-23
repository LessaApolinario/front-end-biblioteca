import { useEffect } from 'react';
import Review from '../../../../../core/domain/models/Review';
import { useReviews } from '../../../../../hooks/useReviews';
import { ReviewCard } from '../ReviewCard';
import styles from './styles.module.scss';

function ListReviews() {
  const { fetch, getReviews } = useReviews();
  const { reviews } = getReviews();

  useEffect(() => {
    fetch();
  }, []);

  function renderItem(review: Review) {
    return <ReviewCard props={review} key={review._id} />;
  }

  return (
    <div className={styles.container}>
      {reviews?.map((review) => renderItem(review))}
    </div>
  );
}

export { ListReviews };
