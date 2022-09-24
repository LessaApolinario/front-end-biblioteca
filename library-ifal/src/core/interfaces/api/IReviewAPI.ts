import Review from '../../domain/models/Review'
import PostDTO from '../../dto/PostDTO'
import IAPI from './IAPI'

abstract class IReviewAPI extends IAPI {
  abstract fetch(): Promise<Review[]>
  abstract create(post: PostDTO): Promise<void>

}

export default IReviewAPI
