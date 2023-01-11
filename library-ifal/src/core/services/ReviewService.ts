import Review from '../domain/models/Review';
import IReviewService from '../interfaces/services/IReviewService';

class ReviewService extends IReviewService {
  fetch(): Promise<Review[]> {
    return this.adapter.fetch();
  }

  create(review: Review): Promise<void> {
    return this.adapter.create(review);
  }

  search(query: string): Promise<Review[]> {
    return this.adapter.search(query);
  }
}

export default ReviewService;
