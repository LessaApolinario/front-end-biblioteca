import Review from '../../domain/models/Review'
import IAPI from './IAPI'

abstract class IReviewAPI extends IAPI {
  abstract fetch(): Promise<Review[]>
  abstract create(
    user_id: string,
    name: string,
    title_book: string,
    writer: string,
    review: string,
    available: boolean
  ): Promise<void>
  abstract search(query: string): Promise<Review[]>
}

export default IReviewAPI
