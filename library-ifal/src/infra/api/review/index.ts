import Review from '../../../core/domain/models/Review';
import { DTO } from '../../../core/domain/types/DTO';
import ReviewAdapter from '../../../core/interfaces/adapter/ReviewAdapter';
import { APIClient } from '../clients/APIClient';

class ReviewAPI extends ReviewAdapter {
  async fetch(): Promise<Review[]> {
    const response = await APIClient.get<DTO[]>('/api/reviews');
    return response.data.map(Review.fromJSON);
  }

  async create(review: Review): Promise<void> {
    await APIClient.post('/api/reviews', JSON.stringify(review.toJSON()), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async search(query: string): Promise<Review[]> {
    const response = await APIClient.get<DTO[]>(
      `/api/review/search?s=${query}`
    );
    return response.data.map(Review.fromJSON);
  }
}

export default ReviewAPI;
