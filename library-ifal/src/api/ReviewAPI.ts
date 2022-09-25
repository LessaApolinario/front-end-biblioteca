import Review from '../core/domain/models/Review'
import IReviewAPI from '../core/interfaces/api/IReviewAPI'

class ReviewAPI extends IReviewAPI {
  async fetch(): Promise<Review[]> {
    const response = await this.client.get('/api/reviews')
    const reviews: Review[] = response.data.map((item: Record<string, unknown>) =>
      Review.fromJSON(item)
    )

    return reviews
  }

  async create(review: Review): Promise<void> {
    await this.client.post('/api/reviews', JSON.stringify(review), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

export default ReviewAPI
