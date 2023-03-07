import { createRef, useCallback, useContext } from 'react';

import { useNotifications } from './useNotifications';

import Review from '../core/domain/models/Review';

import { ReviewCTX } from '../ui/contexts/ReviewCTX';

export function useReviews() {
  const { notifyError } = useNotifications();
  const reviewCTX = useContext(ReviewCTX);

  const searchReview = useCallback(async (query: string) => {
    await reviewCTX.search(query);
  }, []);

  const fetchReviews = useCallback(async () => {
    await reviewCTX.fetch();
  }, []);

  const createReview = useCallback(async (review: Review) => {
    try {
      await reviewCTX.create(review);
    } catch (error: any) {
      notifyError(error.message);
    }
  }, []);

  function getReviews() {
    return { reviews: reviewCTX.reviews };
  }

  return {
    fetchReviews,
    searchReview,
    createReview,
    getReviews,
  };
}
