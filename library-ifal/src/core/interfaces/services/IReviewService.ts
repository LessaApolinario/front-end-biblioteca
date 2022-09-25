import Review from '../../domain/models/Review'

abstract class IReviewService {
  abstract fetch(): Promise<Review[]>
  abstract create(review: Review): Promise<void>
}

export default IReviewService
