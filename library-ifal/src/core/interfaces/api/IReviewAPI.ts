import Review from '../../domain/models/Review'
import IAPI from './IAPI'

abstract class IReviewAPI extends IAPI {
  abstract fetch(): Promise<Review[]>
  abstract create(review: Review): Promise<void>
}

export default IReviewAPI
