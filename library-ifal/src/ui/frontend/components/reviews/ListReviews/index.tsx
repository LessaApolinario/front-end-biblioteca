import Review from '../../../../../core/domain/models/Review';
import { useReviews } from '../../../../../hooks/useReviews';
import { ReviewCard } from '../ReviewCard';
import styles from './styles.module.scss';

function ListReviews() {
  const { getReviews } = useReviews();
  const { reviews } = getReviews();

  function renderItem(review: Review) {
    return <ReviewCard props={review} key={review._id} />;
  }

  const r: Review[] = [
    Review.fromJSON({
      id: 'çakljhgjsfkldff',
      name: 'Lessa',
      title_book: 'Math',
      writer: 'Stewart',
      review: 'Muito bom de verdade.',
      created_at: new Date(),
    }),
  ];

  return (
    <div className={styles.container}>
      {r?.map((review) => renderItem(review))}
    </div>
  );
}

export { ListReviews };
