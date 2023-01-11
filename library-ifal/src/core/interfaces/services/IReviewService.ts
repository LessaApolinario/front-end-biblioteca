import Review from '../../domain/models/Review';
import ReviewAdapter from '../adapter/ReviewAdapter';

abstract class IReviewService {
  constructor(protected readonly adapter: ReviewAdapter) {}

  abstract fetch(): Promise<Review[]>;
  abstract create(review: Review): Promise<void>;
  abstract search(query: string): Promise<Review[]>;
}

export default IReviewService;
