import Review from '../../domain/models/Review';

abstract class ReviewAdapter {
  abstract fetch(): Promise<Review[]>;
  abstract create(review: Review): Promise<void>;
  abstract search(query: string): Promise<Review[]>;
}

export default ReviewAdapter;
