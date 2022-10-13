import ReviewAPI from '../api/ReviewAPI';
import Review from '../core/domain/models/Review';
import IReviewService from '../core/interfaces/services/IReviewService'

class ReviewService extends IReviewService {
  fetch(): Promise<Review[]> {
    return new ReviewAPI().fetch()
  }

  async create(
    user_id: string,
    name: string,
    title_book: string,
    writer: string,
    review: string,
    available: boolean
  ): Promise<void> {
    await new ReviewAPI().create(user_id, name, title_book, writer, review, available)
  }

  async search(query: string): Promise<Review[]> {
    return await new ReviewAPI().search(query)
  }
}

export default ReviewService
