import Review from '../../domain/models/Review'

abstract class IReviewService {
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

export default IReviewService
