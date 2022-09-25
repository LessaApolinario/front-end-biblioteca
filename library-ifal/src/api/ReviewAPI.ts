import Review from '../core/domain/models/Review'
import IReviewAPI from '../core/interfaces/api/IReviewAPI'

class ReviewAPI extends IReviewAPI {
  async fetch(): Promise<Review[]> {
    const response = await this.client.get('/api/reviews')
    const reviews: Review[] = response.data.map((item: Record<string, unknown>) => {
      if (!item["name"]) {
        item["name"] = ''
      }

      if (!item["title_book"]) {
        item["title_book"] = ''
      }

      if (!item["writer"]) {
        item["writer"] = ''
      }

      if (!item["review"]) {
        item["review"] = ''
      }
      
      return Review.fromJSON(item)
    })

    return reviews
  }

  async create(
    user_id: string,
    name: string,
    title_book: string,
    writer: string,
    review: string,
    available: boolean
  ): Promise<Review> {
    const response = await this.client.post('/api/reviews',
      JSON.stringify({ user_id, name, title_book, writer, review, available }), {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return response.data
  }

  async search(query: string): Promise<Review[]> {
    const response = await this.client.get(`/api/review/search?s=${query}`)
    return response.data
  }
}

export default ReviewAPI
