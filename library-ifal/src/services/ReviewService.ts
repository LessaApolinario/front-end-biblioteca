import ReviewAPI from '../api/ReviewAPI';
import Review from '../core/domain/models/Review';
import IReviewService from '../core/interfaces/services/IReviewService'

class ReviewService extends IReviewService {
  fetch(): Promise<Review[]> {
    return new ReviewAPI().fetch()
  }

  async create(review: Review): Promise<void> {
    await new ReviewAPI().create(review)
  }

  async search(query: string): Promise<Review[]> {
    return await new ReviewAPI().search(query)
  }
}

export default ReviewService
